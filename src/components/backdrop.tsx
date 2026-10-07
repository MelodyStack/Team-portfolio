/**
 * Fixed page backdrop: two slow-floating warm washes over cream.
 *
 * This is what stops a cream page reading as flat beige. The tints are clay
 * and teal at very low opacity, so they add depth without ever becoming a
 * colour in their own right.
 *
 * Sits in the layout rather than per-page so it never re-mounts (and so never
 * flashes) on navigation. Server component, so it costs nothing on the client.
 */
export function Backdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-cream"
    >
      {/* Warm clay wash, top right, behind the hero. */}
      <div className="absolute -top-[26rem] -right-[18rem] size-[52rem] animate-float rounded-full bg-clay/[0.07] blur-[130px]" />

      {/* Cool teal counterweight, slower and lower, so the two never pulse
          in sympathy. */}
      <div
        className="absolute top-[55%] -left-[20rem] size-[44rem] animate-float rounded-full bg-teal/[0.06] blur-[140px]"
        style={{ animationDuration: "22s", animationDelay: "-7s" }}
      />

      {/* Paper grain. An inline SVG turbulence data URI rather than a PNG:
          ~400 bytes, no extra request, and it never shows a loading seam. */}
      <div
        className="absolute inset-0 opacity-[0.025] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "160px 160px",
        }}
      />
    </div>
  );
}
