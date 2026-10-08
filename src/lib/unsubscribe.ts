/**
 * Records an unsubscribe.
 *
 * Called from two places that must behave identically: the page a human lands
 * on from the footer link, and the POST endpoint Gmail and Yahoo hit for
 * one-click unsubscribe (RFC 8058).
 *
 * Delivery is by email to the team inbox rather than to a database. There is
 * no database on this deployment, and every host that runs Next.js has an
 * ephemeral filesystem, so writing a file would silently lose the record on
 * the next deploy. One mailbox is the thing that definitely still exists.
 *
 * This never throws and never reports failure to the person unsubscribing.
 * Showing someone an error when they ask to be left alone is how you earn a
 * spam complaint, which costs far more than a lost record. Failures are
 * logged loudly instead, because the host log is the backstop.
 */

/**
 * Deliberately stricter than the contact form's.
 *
 * This is the same pattern the campaign sender validates with, which matters:
 * the sender generates these links, so anything it would not send to has no
 * business being accepted here. Excluding `<>"(),;` keeps markup and address
 * separators out of the log line and out of the Resend subject, neither of
 * which should ever carry an attacker-chosen string even when both escape it
 * correctly.
 *
 * The domain side must permit dots. Excluding them limits the domain to a
 * single label and silently rejects `jane@example.co.uk` and every subdomain
 * address, which is a large slice of a real list.
 */
const EMAIL_RE = /^[^\s@,;<>"()[\]\\]+@[^\s@,;<>"()[\]\\]+\.[a-z]{2,}$/i;

export type UnsubscribeOutcome = "recorded" | "invalid" | "unconfigured" | "failed";

/** Strip anything that could be smuggled into a mail header. */
function singleLine(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim().slice(0, 200);
}

export function normaliseEmail(raw: string | undefined | null): string | null {
  if (!raw) return null;
  const email = singleLine(String(raw)).toLowerCase();
  return EMAIL_RE.test(email) ? email : null;
}

export async function recordUnsubscribe(
  raw: string | undefined | null,
  source: "link" | "one-click",
): Promise<UnsubscribeOutcome> {
  const email = normaliseEmail(raw);

  if (!email) {
    console.warn(`[unsubscribe] ${source}: no valid address in request`);
    return "invalid";
  }

  // Always log, whatever happens next. If the send fails, this line in the
  // host log is the only remaining record, so it is deliberately greppable.
  console.log(`[unsubscribe] RECORDED ${email} via ${source}`);

  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  const apiKey = process.env.RESEND_API_KEY;

  if (!to || !from || !apiKey) {
    console.warn(`[unsubscribe] not configured, ${email} is in this log only`);
    return "unconfigured";
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `Unsubscribe <${from}>`,
        to: [to],
        // The address is the whole payload, so it goes in the subject where
        // it can be read from the inbox list without opening anything.
        subject: `Unsubscribe: ${email}`,
        text: [
          email,
          "",
          `Requested via: ${source === "one-click" ? "one-click (mail client)" : "footer link"}`,
          `At: ${new Date().toISOString()}`,
          "",
          "Add this address to marketing/sender/data/suppression.txt so it is",
          "stripped from every future paste.",
        ].join("\n"),
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      console.error(
        `[unsubscribe] Resend responded ${response.status} for ${email}:`,
        await response.text().catch(() => "<unreadable>"),
      );
      return "failed";
    }

    return "recorded";
  } catch (error) {
    console.error(`[unsubscribe] request failed for ${email}:`, error);
    return "failed";
  }
}
