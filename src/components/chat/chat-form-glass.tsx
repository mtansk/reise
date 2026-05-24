"use client";
import type { Vibe } from "@/generated/prisma/enums";
import { cn } from "@/lib/utils";
import { VIBE_CONFIG } from "../vibe/vibe-badge";
import { ChatFormDisplayStatus } from "./chat-continue-form";

export function LiquidGlassBackground({
  displayStatus,
  vibes,
}: {
  displayStatus: ChatFormDisplayStatus;
  vibes: Vibe[];
}) {
  if (displayStatus !== "pending") return null;

  return (
    <div className="absolute inset-0 z-0 overflow-hidden opacity-70 mix-blend-multiply transition-opacity duration-1000 dark:mix-blend-color-dodge">
      {vibes.length > 0 ?
        vibes.map((v, i) => (
          <div
            key={v}
            className={cn(
              "animate-blob absolute -top-10 h-40 w-40 rounded-full blur-3xl",
              VIBE_CONFIG[v].bgClass,
              i % 3 === 1 ? "animation-delay-2000 left-10"
              : i % 3 === 2 ?
                "animation-delay-4000 left-1/2"
              : "right-10",
            )}
            style={{ left: `${(i * 25) % 80}%` }}
          />
        ))
      : <>
          <div className="animate-blob absolute top-0 -left-4 h-40 w-40 rounded-full bg-purple-500/50 blur-3xl"></div>
          <div className="animate-blob animation-delay-2000 absolute top-0 -right-4 h-40 w-40 rounded-full bg-blue-500/50 blur-3xl"></div>
          <div className="animate-blob animation-delay-4000 absolute -bottom-8 left-20 h-40 w-40 rounded-full bg-pink-500/50 blur-3xl"></div>
        </>
      }
    </div>
  );
}
