import Link from "next/link";
import { Button } from "@/components/button";
import { nav } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden">
      
      <div className="shell relative flex min-h-[70vh] flex-col justify-center py-32">
        <p className="eyebrow">Error 404</p>

        <h1 className="headline mt-6 text-[clamp(2.6rem,8vw,5.5rem)]">
          That page{" "}
          <span className="text-ink">shipped</span>{" "}
          without a URL.
        </h1>

        <p className="mt-7 max-w-xl text-[1.0625rem] leading-relaxed text-muted">
          Which is our mistake, not yours. The work, the services and the way we
          run a project are all still where they should be.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Button href="/" size="lg">
            Back to the homepage
          </Button>
          <Button href="/work" variant="secondary" size="lg">
            See the work
          </Button>
        </div>

        <nav aria-label="Site sections" className="mt-14">
          <p className="text-[0.8125rem] text-faint">
            Or jump to
          </p>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
            {[...nav, { label: "Contact", href: "/contact" }].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-[0.9375rem] text-muted underline decoration-line underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
