import type { Vibe } from "@/generated/prisma/enums";
import { Badge } from "./ui/badge";
import type { LucideIcon } from "lucide-react";
import {
  Baby,
  Handbag,
  Landmark,
  PartyPopper,
  Theater,
  TreePine,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function VibeBadge({
  vibe,
  className,
}: {
  vibe: Vibe;
  className?: string;
}) {
  const config = VIBE_CONFIG[vibe];
  const Icon = config.icon;

  return (
    <Badge
      variant="outline"
      className={cn(
        config.activeClass,
        "border px-2 py-0.5 text-xs font-semibold",
        className,
      )}
    >
      <Icon
        data-icon="inline-start"
        className="mr-1 h-3.5 w-3.5"
      />
      {config.label}
    </Badge>
  );
}

const IDLE_CLASS =
  "border-border bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground";

export const VIBE_CONFIG: Record<
  Vibe,
  {
    icon: LucideIcon;
    label: string;
    activeClass: string;
    idleClass: string;
    particleClass: string;
  }
> = {
  history: {
    icon: Landmark,
    label: "History",
    activeClass:
      "border-amber-500/40 bg-amber-500/15 text-amber-900 dark:text-amber-200",
    idleClass: IDLE_CLASS,
    particleClass: "text-amber-500",
  },
  partying: {
    icon: PartyPopper,
    label: "Partying",
    activeClass:
      "border-pink-500/40 bg-pink-500/15 text-pink-900 dark:text-pink-200",
    idleClass: IDLE_CLASS,
    particleClass: "text-pink-500",
  },
  nature: {
    icon: TreePine,
    label: "Nature",
    activeClass:
      "border-emerald-500/40 bg-emerald-500/15 text-emerald-900 dark:text-emerald-200",
    idleClass: IDLE_CLASS,
    particleClass: "text-emerald-500",
  },
  family: {
    icon: Baby,
    label: "Family",
    activeClass:
      "border-blue-500/40 bg-blue-500/15 text-blue-900 dark:text-blue-200",
    idleClass: IDLE_CLASS,
    particleClass: "text-blue-500",
  },
  culture: {
    icon: Theater,
    label: "Culture",
    activeClass:
      "border-violet-500/40 bg-violet-500/15 text-violet-900 dark:text-violet-200",
    idleClass: IDLE_CLASS,
    particleClass: "text-violet-500",
  },
  shopping: {
    icon: Handbag,
    label: "Shopping",
    activeClass:
      "border-red-500/40 bg-red-500/15 text-red-900 dark:text-red-200",
    idleClass: IDLE_CLASS,
    particleClass: "text-red-500",
  },
};
