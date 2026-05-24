"use client";
import type { Vibe } from "@/generated/prisma/enums";
import { cn } from "@/lib/utils";
import { ChatFormDisplayStatus } from "../chat/chat-continue-form";
import { VIBE_CONFIG } from "../vibe/vibe-badge";

export function LiquidGlassBackground({
  displayStatus,
  vibes,
}: {
  displayStatus: ChatFormDisplayStatus;
  vibes: Vibe[];
}) {
  if (displayStatus === "idle") return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 mask-[radial-gradient(ellipse_at_center,black_10%,transparent_60%)] opacity-80 mix-blend-multiply transition-opacity duration-1000 dark:mix-blend-color-dodge">
        {vibes.length > 0 ?
          vibes.map((v, i) => (
            <div
              key={v}
              className={cn(
                "animate-blob absolute h-80 w-80 rounded-full blur-[100px]",
                VIBE_CONFIG[v].bgClass,
                i % 3 === 1 ?
                  "animation-delay-2000 top-[20%] left-[20%]"
                : i % 3 === 2 ?
                  "animation-delay-4000 top-[30%] left-[50%]"
                : "top-[10%] right-[20%]",
              )}
            />
          ))
        : <>
            <div className="animate-blob absolute top-[20%] left-[20%] h-80 w-80 rounded-full bg-purple-500/50 blur-[100px]"></div>
            <div className="animate-blob animation-delay-2000 absolute top-[10%] right-[20%] h-80 w-80 rounded-full bg-blue-500/50 blur-[100px]"></div>
            <div className="animate-blob animation-delay-4000 absolute top-[30%] left-[50%] h-80 w-80 rounded-full bg-pink-500/50 blur-[100px]"></div>
          </>
        }
      </div>
      <div className="absolute inset-0 bg-white/5 mask-[radial-gradient(ellipse_at_center,black_30%,transparent_60%)] backdrop-blur-3xl transition-opacity duration-1000 dark:bg-black/10" />
    </div>
  );
}
