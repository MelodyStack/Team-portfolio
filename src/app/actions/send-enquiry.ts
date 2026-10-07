"use server";

/**
 * Delivers a contact-form enquiry by email.
 *
 * Runs on the server, so the API key is never exposed. Sending goes through
 * Resend's HTTP API with plain `fetch` rather than an SDK: it is one request,
 * it adds no dependency, and it works unchanged on any host that can run a
 * server action.
 *
 * The contract with the UI is deliberate: this never throws and never lies.
 * If it cannot send, it says so, and the form falls back to composing the
 * message in the visitor's mail client. A contact form that silently drops an
 * enquiry is worse than one that was never wired up, because you don't find
 * out for months.
 */

export type EnquiryResult =
  | { ok: true }
  | { ok: false; reason: "invalid" | "unconfigured" | "failed"; message: string };

export type EnquiryInput = {
  name: string;
  company: string;
  email: string;
  service: string;
  budget: string;
  timeline: string;
  message: string;
  /** Honeypot. Real people never see this field, so anything in it is a bot. */
  website?: string;
};

/** Good enough to catch typos; real validation is the reply bouncing. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

/** Keep header-injection payloads out of the subject line and Reply-To. */
function singleLine(value: string) {
  return value.replace(/[\r\n]+/g, " ");
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function sendEnquiry(input: EnquiryInput): Promise<EnquiryResult> {
  // Silently accept and discard bot submissions. Returning an error would
  // tell a scripted submitter which field gave it away.
  if (clean(input.website, 100)) return { ok: true };

  const name = singleLine(clean(input.name, 120));
  const company = singleLine(clean(input.company, 160));
  const email = singleLine(clean(input.email, 200));
  const service = singleLine(clean(input.service, 120));
  const budget = singleLine(clean(input.budget, 60));
  const timeline = singleLine(clean(input.timeline, 60));
  const message = clean(input.message, 6000);

  if (!name || !EMAIL_RE.test(email) || message.length < 10) {
    return {
      ok: false,
      reason: "invalid",
      message:
        "Please add your name, a valid email address, and a line or two about the project.",
    };
  }

  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  const apiKey = process.env.RESEND_API_KEY;

  if (!to || !from || !apiKey) {
    return {
      ok: false,
      reason: "unconfigured",
      message: "Email sending is not configured on this deployment yet.",
    };
  }

  const subject = `Build review: ${company || name}`;
  const rows: Array<[string, string]> = [
    ["Name", name],
    ["Company", company || "n/a"],
    ["Email", email],
    ["Service", service],
    ["Budget", budget],
    ["Timeline", timeline],
  ];

  const text = [
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    "What they are trying to build:",
    message,
  ].join("\n");

  const html = [
    '<div style="font-family:ui-sans-serif,system-ui,sans-serif;font-size:15px;line-height:1.6;color:#1c2b2a">',
    `<h2 style="margin:0 0 16px;font-size:18px">New enquiry from ${escapeHtml(name)}</h2>`,
    '<table cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-bottom:20px">',
    ...rows.map(
      ([k, v]) =>
        `<tr><td style="padding:4px 16px 4px 0;color:#64726f">${k}</td>` +
        `<td style="padding:4px 0"><strong>${escapeHtml(v)}</strong></td></tr>`,
    ),
    "</table>",
    '<p style="margin:0 0 6px;color:#64726f">What they are trying to build</p>',
    `<p style="margin:0;white-space:pre-wrap">${escapeHtml(message)}</p>`,
    "</div>",
  ].join("");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `Website enquiry <${from}>`,
        to: [to],
        subject,
        text,
        html,
        // So hitting reply in the inbox goes to the founder, not to us.
        reply_to: email,
      }),
      // Don't leave a visitor staring at a spinner if the provider hangs.
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      // Logged server-side only; the body can contain provider detail that is
      // not the visitor's problem.
      console.error(
        `[send-enquiry] Resend responded ${response.status}:`,
        await response.text().catch(() => "<unreadable>"),
      );
      return {
        ok: false,
        reason: "failed",
        message: "We could not send that automatically.",
      };
    }

    return { ok: true };
  } catch (error) {
    console.error("[send-enquiry] request failed:", error);
    return {
      ok: false,
      reason: "failed",
      message: "We could not send that automatically.",
    };
  }
}
