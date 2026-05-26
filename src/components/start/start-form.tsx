"use client";

import StartButtonGroup from "./start-button-group";
import StartCombobox from "./start-combobox";
import VibeToggleGroup from "./vibe-toggle-group";
import { useChatStartStore } from "@/providers/chat-start-store-provider";
import { processChatInitializationAction } from "@/server/actions/chats";
import { useStateAction } from "next-safe-action/hooks";
import { ChatFormDisplayStatus } from "../chat/chat-continue-form";
import { cn } from "@/lib/utils";
import { StartPendingBlock } from "./start-pending-block";
import { StartErrorBlock } from "./start-error-block";
import { LiquidGlassBackground } from "./start-glass";
import { motion } from "framer-motion";

export default function StartForm() {
  const location = useChatStartStore(
    (state) => state.location,
  );
  const vibe = useChatStartStore((state) => state.vibe);

  const { formAction, isPending, hasErrored, reset } =
    useStateAction(processChatInitializationAction);

  function formActionHandler() {
    if (!location || vibe.size === 0) return;
    formAction({
      location,
      vibe: Array.from(vibe),
    });
  }

  const displayStatus: ChatFormDisplayStatus =
    hasErrored ? "error"
    : isPending ? "pending"
    : "idle";

  return (
    <div className="flex w-full grow flex-col items-center justify-center gap-12">
      {!location && displayStatus === "idle" && (
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className={cn(
            "text-4xl tracking-tight text-slate-900 md:text-6xl dark:text-white",
          )}
        >
          <span className="font-extrabold">
            Where do you start?
          </span>
        </motion.h1>
      )}
      {location && displayStatus === "idle" && (
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className={cn(
            "text-4xl tracking-tight text-slate-900 md:text-6xl dark:text-white",
          )}
        >
          <span className="font-extrabold">
            What is your vibe?
          </span>
        </motion.h1>
      )}
      <form
        className={cn(
          "relative flex w-full flex-col items-center justify-center transition-all duration-1000 ease-in-out",
          displayStatus !== "idle" ? "min-h-[500px]" : (
            "gap-6"
          ),
        )}
        action={formActionHandler}
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
