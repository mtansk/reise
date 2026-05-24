"use client";

import StartButtonGroup from "./start-button-group";
import StartCombobox from "./start-combobox";
import VibeToggleGroup from "./vibe-toggle-group";
import { useChatStartStore } from "@/providers/chat-start-store-provider";
import { processChatInitializationAction } from "@/server/actions/chats";
import { useAction } from "next-safe-action/hooks";
import { ChatFormDisplayStatus } from "../chat/chat-continue-form";
import { cn } from "@/lib/utils";
import { StartPendingBlock } from "./start-pending-block";
import { StartErrorBlock } from "./start-error-block";
import { LiquidGlassBackground } from "./start-glass";

export default function StartForm() {
  const location = useChatStartStore(
    (state) => state.location,
  );
  const vibe = useChatStartStore((state) => state.vibe);

  const { executeAsync, isPending, hasErrored, reset } =
    useAction(processChatInitializationAction);

  const displayStatus: ChatFormDisplayStatus =
    hasErrored ? "error"
    : isPending ? "pending"
    : "idle";

  return (
    <div className="relative flex w-full grow flex-col items-center justify-center">
      <form
        className={cn(
          "relative flex w-full flex-col items-center justify-center transition-all duration-1000 ease-in-out",
          displayStatus !== "idle" ? "min-h-[500px]" : (
            "gap-6"
          ),
        )}
        onSubmit={async (e) => {
          e.preventDefault();
          if (!location) return;
          await executeAsync({
            location: location,
            vibe: Array.from(vibe),
          });
        }}
      >
        <LiquidGlassBackground
          displayStatus={displayStatus}
          vibes={Array.from(vibe)}
        />

        <div className="relative z-10 flex w-full flex-col items-center justify-center gap-6">
          {displayStatus === "idle" && (
            <>
              <StartCombobox />
              <VibeToggleGroup />
              <StartButtonGroup />
            </>
          )}

          {displayStatus === "pending" && (
            <StartPendingBlock vibe={Array.from(vibe)} />
          )}

          {displayStatus === "error" && (
            <StartErrorBlock reset={reset} />
          )}
        </div>
      </form>
    </div>
  );
}
