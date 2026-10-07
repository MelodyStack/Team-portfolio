import Image from "next/image";
import {
  Layers,
  PenTool,
  Server,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Workflow,
} from "lucide-react";
import type { Member } from "@/lib/site";
import { cn } from "@/lib/utils";

const ROLE_ICONS = {
  Workflow,
  Layers,
  Server,
  Smartphone,
  PenTool,
  ShieldCheck,
  ShoppingBag,
} as const;

/**
 * A team member's avatar: their real photo if there is one, otherwise the
 * icon for their discipline.
 *
 * An icon rather than a monogram, because these are role placeholders. "TL"
 * in a tile implies a person called T. L. and reads as a profile nobody
 * filled in, which is exactly the look that makes a team page feel fake. An
 * icon is honest about standing for a role, and it stays presentable until
 * real photographs exist.
 *
 * Shared by the team page and the homepage strip so the two can't drift.
 */
export function MemberAvatar({
  member,
  size = "md",
}: {
  member: Member;
  /** `sm` for the homepage strip, `md` for the team page cards. */
  size?: "sm" | "md";
}) {
  const px = size === "sm" ? 48 : 56;
  const box = size === "sm" ? "size-12" : "size-14";
  const glyph = size === "sm" ? "size-5" : "size-6";

  if (member.photo) {
    return (
      <Image
        src={member.photo}
        alt={member.name}
        width={px}
        height={px}
        sizes={`${px}px`}
        className={cn(
          box,
          "shrink-0 rounded-full object-cover ring-1 ring-line",
        )}
      />
    );
  }

  const Icon = ROLE_ICONS[member.icon];

  return (
    <span
      className={cn(
        box,
        "grid shrink-0 place-items-center rounded-full bg-teal/8 text-teal ring-1 ring-teal/15 transition-colors duration-300 group-hover:bg-teal group-hover:text-on-teal",
      )}
    >
      <Icon className={glyph} aria-hidden strokeWidth={1.75} />
    </span>
  );
}
