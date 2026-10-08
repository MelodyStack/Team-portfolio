import type { Metadata } from "next";
import { Button } from "@/components/button";
import { contact } from "@/lib/site";
import { normaliseEmail, recordUnsubscribe } from "@/lib/unsubscribe";

/**
 * The page someone lands on from the unsubscribe link in an email footer.
 *
 * Deliberately a dead end: it confirms, it does not try to win them back. No
 * "are you sure", no survey, no preference centre, no offer. Someone who has
 * decided to leave and is made to work for it reports the next email as spam
 * instead, and a spam complaint costs the sending reputation for everyone.
 *
 * Recording happens on GET rather than behind a confirm button. The tradeoff
 * is that a link-scanning security product can unsubscribe someone who never
 * clicked. That direction of error is safe: the cost is one person we stop
 * emailing. The other direction, failing to honour an opt-out, is a legal
 * problem and a complaint, so the asymmetry decides it.
 *
 * `force-dynamic` because this has a side effect and reads a query string;
 * prerendering it would record nothing and show a stale address.
 */

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Unsubscribed",
  description: "You have been removed from the Spadework mailing list.",
  // Never index an unsubscribe page: the URLs carry an email address.
  robots: { index: false, follow: false },
};

export default async function UnsubscribePage({
  searchParams,
}: {
  searchParams: Promise<{ e?: string | string[] }>;
}) {
  const params = await searchParams;
  const rawParam = Array.isArray(params.e) ? params.e[0] : params.e;
  const email = normaliseEmail(rawParam);

  // Only record when there is a real address. A bare /unsubscribe with no
  // parameter gets instructions instead of a false confirmation.
  if (email) await recordUnsubscribe(email, "link");

  return (
    <section className="relative overflow-hidden">
      <div className="shell relative flex min-h-[70vh] flex-col justify-center py-32">
        {email ? (
          <>
            <p className="eyebrow">Unsubscribed</p>

            <h1 className="headline mt-6 text-[clamp(2.2rem,6vw,4rem)]">
              Done. You will not hear from us again.
            </h1>

            <p className="mt-7 max-w-xl text-[1.0625rem] leading-relaxed text-muted">
              <span className="font-medium text-ink">{email}</span> has been
              removed from our list. No confirmation email is coming, because
              sending one would defeat the point.
            </p>

            <p className="mt-5 max-w-xl text-[0.9375rem] leading-relaxed text-faint">
              If something still arrives, it was already in flight before you
              clicked. Reply to it and we will deal with it by hand.
            </p>
          </>
        ) : (
          <>
            <p className="eyebrow">Unsubscribe</p>

            <h1 className="headline mt-6 text-[clamp(2.2rem,6vw,4rem)]">
              We need to know which address.
            </h1>

            <p className="mt-7 max-w-xl text-[1.0625rem] leading-relaxed text-muted">
              This link arrived without an email address on it, so there is
              nothing for us to remove. Use the unsubscribe link in the email
              you received, or email us and we will do it manually.
            </p>

            <p className="mt-5 max-w-xl text-[0.9375rem] leading-relaxed text-faint">
              Either way it gets done. You do not have to explain why.
            </p>
          </>
        )}

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Button href={`mailto:${contact.email}`} variant="secondary" size="lg">
            Email us instead
          </Button>
          <Button href="/" variant="secondary" size="lg">
            Go to the homepage
          </Button>
        </div>
      </div>
    </section>
  );
}
