"use client";

import type { Vibe } from "@/generated/prisma/enums";
import { cn } from "@/lib/utils";
import { VIBE_CONFIG } from "../vibe-badge";
import { ParticleEffect } from "@/components/ui/particle-effect";

export function VibeToggle({
  vibe,
  onPressedChange,
  pressed,
}: {
  vibe: Vibe;
  onPressedChange: (pressed: boolean) => void;
  pressed: boolean;
}) {
  const config = VIBE_CONFIG[vibe];
  const Icon = config.icon;

  return (
    <ParticleEffect icon={Icon} colorClass={config.particleClass}>
      <button
        onClick={() => onPressedChange(!pressed)}
        className={cn(
          "relative flex cursor-pointer items-center gap-2 overflow-visible rounded-full border px-3 py-1 text-sm font-medium transition-colors duration-400",
          pressed ? config.activeClass : config.idleClass,
        )}
        type="button"
      >
        <Icon
          data-icon="inline-start"
          size={16}
          className="relative z-10"
        />
        <span className="relative z-10">{config.label}</span>
      </button>
    </ParticleEffect>
  );
}
