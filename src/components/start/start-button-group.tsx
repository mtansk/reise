"use client";

import { useChatStartStore } from "@/providers/chat-start-store-provider";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

export default function StartButtonGroup() {
  const location = useChatStartStore(
    (state) => state.location,
  );
  const vibe = useChatStartStore((state) => state.vibe);

  return (
    <Button
      type="submit"
      className={cn(
        "cursor-pointer rounded-full px-8 py-5 text-base transition-all duration-300 ease-in-out hover:scale-105",
      )}
      disabled={!location || vibe.size === 0}
    >
      <Sparkles strokeWidth={2} />
      <span>Start</span>
    </Button>
  );
}
