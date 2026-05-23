"use client";

import { useChatStartStore } from "@/providers/chat-start-store-provider";
import { StartButton } from "./start-button";

export default function StartButtonGroup() {
  const location = useChatStartStore(
    (state) => state.location,
  );
  const vibe = useChatStartStore((state) => state.vibe);

  return (
    <div>
      <StartButton
        disabled={!location || vibe.size === 0}
        //disabled={false}
      />
    </div>
  );
}
