import { NextResponse } from "next/server";
import { normaliseEmail, recordUnsubscribe } from "@/lib/unsubscribe";

/**
 * One-click unsubscribe, RFC 8058.
 *
 * This is the URL that goes in the `List-Unsubscribe` header, not the one in
 * the visible footer. When an email also carries
 * `List-Unsubscribe-Post: List-Unsubscribe=One-Click`, Gmail and Yahoo show
 * their own unsubscribe control and POST here when it is used. Since February
 * 2024 both require that of bulk senders.
 *
 * Two rules the RFC is strict about, and both are easy to get wrong:
 *
 *  - It must be a POST. A GET must never be the mutating path for the header
 *    URL, because mail providers and security scanners prefetch links.
 *  - It must complete without any further interaction. No confirmation page,
 *    no login, no redirect to a preference centre. Returning anything other
 *    than a 2xx makes the provider treat the unsubscribe as broken, which is
 *    worse than not offering one.
 *
 * GET is still handled, by redirecting to the human page, so that a person
 * who somehow opens the header URL in a browser is not left at a blank 405.
 * That redirect does not record anything; the page it lands on does.
 */

export const dynamic = "force-dynamic";

function emailFrom(request: Request) {
  return new URL(request.url).searchParams.get("e");
}

export async function POST(request: Request) {
  const email = emailFrom(request);

  // The body is `List-Unsubscribe=One-Click` per the RFC. It is read and
  // discarded: the address is in the URL, and refusing a request because the
  // body was shaped unexpectedly would break the unsubscribe for the sake of
  // pedantry. The address alone is what matters.
  await request.text().catch(() => "");

  await recordUnsubscribe(email, "one-click");

  // Always 200, even for a missing or malformed address. A non-2xx tells the
  // mail provider the unsubscribe mechanism is unreliable, and that reputation
  // hit lands on every future send.
  return new NextResponse(null, { status: 200 });
}

export async function GET(request: Request) {
  const email = normaliseEmail(emailFrom(request));
  const target = new URL("/unsubscribe", request.url);
  if (email) target.searchParams.set("e", email);
  return NextResponse.redirect(target, 303);
}
