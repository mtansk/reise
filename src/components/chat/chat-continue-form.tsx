"use client";

import type { Vibe } from "@/generated/prisma/client";
import { VIBES } from "@/lib/zod/vibe";
import { useEffect, useState } from "react";
import { VibeToggle } from "../vibe/vibe-toggle";
import { Button } from "../ui/button";
import { processNewRecommendationsForChatAction } from "@/server/actions/chats";
import { useStateAction } from "next-safe-action/hooks";
import { ServerCrash, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Spinner } from "../ui/spinner";
import { LiquidGlassBackground } from "./chat-form-glass";

export type ChatFormDisplayStatus =
  | "idle"
  | "pending"
  | "error";

export default function ChatContinueForm({
  chatId,
  count,
}: {
  chatId: string;
  count?: number;
}) {
  const [vibe, setVibe] = useState<Set<Vibe>>(new Set());

  useEffect(() => {
    const bottom = document.getElementById("latest");
    if (bottom) {
      bottom.scrollIntoView({ behavior: "smooth" });
    }
  }, [count]);

  const { formAction, isPending, hasErrored, reset } =
    useStateAction(processNewRecommendationsForChatAction);

  function formActionHandler() {
    if (vibe.size === 0) return;
    formAction({
      chatId,
      vibe: Array.from(vibe),
    });
  }

  const displayStatus: ChatFormDisplayStatus =
    hasErrored ? "error"
    : isPending ? "pending"
    : "idle";

  const toggleVibe = (vibeToToggle: Vibe) => {
    const newVibes = new Set(vibe);
    if (newVibes.has(vibeToToggle)) {
      newVibes.delete(vibeToToggle);
    } else {
      newVibes.add(vibeToToggle);
    }
    setVibe(newVibes);
  };

  return (
    <form
      action={formActionHandler}
      className="via-background to-background sticky bottom-0 flex w-full flex-row items-center justify-center bg-linear-to-b from-transparent"
    >
      <div
        className={cn(
          "ring-accent relative mb-2 flex min-h-20 w-[95%] max-w-160 flex-row items-center justify-center gap-4 overflow-hidden rounded-2xl border px-8 py-4 shadow-2xl transition-all duration-700 ease-in-out",
          displayStatus === "pending" ?
            "border-white/20 bg-white/5 shadow-[0_8px_32px_0_rgba(255,255,255,0.1)] backdrop-blur-2xl dark:bg-black/20 dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]"
          : "bg-background",
        )}
      >
        <LiquidGlassBackground
          displayStatus={displayStatus}
          vibes={Array.from(vibe)}
        />

        <div className="relative z-10 flex w-full flex-wrap items-center justify-center gap-3">
          {displayStatus === "idle" && (
            <>
              {VIBES.map((_vibe) => (
                <VibeToggle
                  key={_vibe}
                  vibe={_vibe}
                  pressed={vibe.has(_vibe)}
                  onPressedChange={() => toggleVibe(_vibe)}
                />
              ))}
            </>
          )}
          {displayStatus === "pending" && (
            <div className="animate-in fade-in zoom-in flex flex-wrap items-center justify-center gap-3 duration-500">
              {Array.from(vibe).map((_vibe) => (
                <VibeToggle
                  key={_vibe}
                  vibe={_vibe}
                  pressed={true}
                  onPressedChange={() => {}}
                />
              ))}
            </div>
          )}
          {displayStatus === "error" && (
            <div className="flex items-center justify-center gap-2 text-gray-500">
              <ServerCrash className="" />
              AI is unavailable. Please try again
            </div>
          )}
        </div>

        <div className="relative z-10 flex items-center justify-center">
          {displayStatus === "idle" && (
            <Button
              type="submit"
              className={cn(
                "cursor-pointer rounded-full px-4 transition-all duration-300 ease-in-out hover:scale-105",
              )}
              disabled={!vibe.size}
              size="lg"
            >
              <Sparkles strokeWidth={2} />
              <span>Next</span>
            </Button>
          )}
          {displayStatus === "error" && (
            <Button
              onClick={() => reset()}
              variant={"ghost"}
            >
              Ok
            </Button>
          )}
          {displayStatus === "pending" && <Spinner />}
        </div>
      </div>
    </form>
  );
}
