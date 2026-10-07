import { cn } from "@/lib/utils";

/** Which screen the generated wireframe draws. */
export type CoverKind = "storefront" | "collection" | "pdp" | "settings";

/**
 * A generated wireframe cover, used when a project has no screenshot.
 *
 * Deliberately a wireframe rather than a blurred gradient: a wireframe reads
 * as "this is a schematic", which is honest. A fake-looking screenshot reads
 * as a stock photo and quietly damages trust in the real screenshots beside it.
 *
 * Pure SVG-free CSS so it costs nothing and scales to any card size.
 */
export function StorefrontMockup({
  kind = "storefront",
  ink,
  className,
}: {
  kind?: CoverKind;
  /** Accent hex for this project, from coverFor(). */
  ink: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden bg-cream-2",
        className,
      )}
      style={{ ["--ink" as string]: ink }}
      aria-hidden
    >
      {/* Tinted field. */}
      <div
        className="absolute inset-0 opacity-[0.16]"
        style={{
          background: `radial-gradient(ellipse 70% 60% at 30% 0%, ${ink}, transparent 70%)`,
        }}
      />

      <div className="relative flex h-full flex-col p-[6%]">
        {/* Browser chrome: three dots and an address bar. */}
        <div className="mb-[5%] flex items-center gap-[1.5%]">
          <span className="size-1.5 bg-line-soft/25" />
          <span className="size-1.5 bg-line-soft/25" />
          <span className="size-1.5 bg-line-soft/25" />
          <span className="ml-[3%] h-2 flex-1 bg-line-soft/10" />
        </div>

        {kind === "storefront" && <Storefront ink={ink} />}
        {kind === "collection" && <Collection ink={ink} />}
        {kind === "pdp" && <Pdp ink={ink} />}
        {kind === "settings" && <Settings ink={ink} />}
      </div>
    </div>
  );
}

const bar = " bg-line-soft/25";
const block = " bg-line-soft/10";

function Storefront({ ink }: { ink: string }) {
  return (
    <>
      <div className={cn(block, "relative flex-1")}>
        <div className="absolute inset-0 flex flex-col justify-end gap-[3%] p-[6%]">
          <span className={cn(bar, "h-2.5 w-[62%]")} />
          <span className={cn(bar, "h-2 w-[44%] opacity-60")} />
          <span
            className="mt-[2%] h-5 w-[26%]"
            style={{ backgroundColor: ink }}
          />
        </div>
      </div>
      <div className="mt-[4%] grid grid-cols-3 gap-[3%]">
        {[0, 1, 2].map((i) => (
          <div key={i} className={cn(block, "aspect-4/3")} />
        ))}
      </div>
    </>
  );
}

function Collection({ ink }: { ink: string }) {
  return (
    <>
      <div className="mb-[4%] flex items-center justify-between">
        <span className={cn(bar, "h-2 w-[30%]")} />
        <span
          className="h-2 w-[14%] opacity-80"
          style={{ backgroundColor: ink }}
        />
      </div>
      <div className="grid flex-1 grid-cols-[22%_1fr] gap-[4%]">
        {/* Filter rail. */}
        <div className="flex flex-col gap-[8%]">
          {[0, 1, 2, 3, 4].map((i) => (
            <span key={i} className={cn(bar, "h-1.5 w-full opacity-50")} />
          ))}
        </div>
        <div className="grid grid-cols-3 grid-rows-2 gap-[5%]">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i} className={cn(block, "relative")}>
              <span
                className="absolute bottom-[10%] left-[10%] h-1 w-[40%]"
                style={{ backgroundColor: ink, opacity: 0.75 }}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function Pdp({ ink }: { ink: string }) {
  return (
    <div className="grid flex-1 grid-cols-2 gap-[5%]">
      <div className={cn(block, "h-full")} />
      <div className="flex flex-col justify-center gap-[6%]">
        <span className={cn(bar, "h-2.5 w-[80%]")} />
        <span
          className="h-2 w-[34%]"
          style={{ backgroundColor: ink }}
        />
        <div className="flex flex-col gap-[4%] pt-[4%]">
          <span className={cn(bar, "h-1.5 w-full opacity-45")} />
          <span className={cn(bar, "h-1.5 w-[86%] opacity-45")} />
          <span className={cn(bar, "h-1.5 w-[64%] opacity-45")} />
        </div>
        <span
          className="mt-[4%] h-5 w-[58%]"
          style={{ backgroundColor: ink }}
        />
      </div>
    </div>
  );
}

function Settings({ ink }: { ink: string }) {
  return (
    <div className="flex flex-1 flex-col gap-[4%]">
      <span className={cn(bar, "h-2 w-[36%]")} />
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className={cn(block, "flex items-center justify-between p-[3.5%]")}
        >
          <span className={cn(bar, "h-1.5 w-[42%] opacity-60")} />
          <span
            className="h-3 w-7"
            style={{
              backgroundColor: i < 2 ? ink : "transparent",
              border: i < 2 ? "none" : "1px solid rgba(12,12,11,0.25)",
              opacity: i < 2 ? 0.85 : 1,
            }}
          />
        </div>
      ))}
    </div>
  );
}
