"use client";

import StartButtonGroup from "./start-button-group";
import StartCombobox from "./start-combobox";
import VibeToggleGroup from "./vibe-toggle-group";
import { useState } from "react";
import { useChatStartStore } from "@/providers/chat-start-store-provider";
import { processChatInitializationAction } from "@/server/actions/chats";

export default function StartForm() {
  const [text, setText] = useState<any>("");

  const location = useChatStartStore(
    (state) => state.location,
  );
  const vibe = useChatStartStore((state) => state.vibe);

  return (
    <form
      className="flex h-full w-full flex-col items-center justify-center gap-6"
      onSubmit={async (e) => {
        e.preventDefault();
        setText(
          JSON.stringify(
            await processChatInitializationAction({
              location: location!,
              vibe: Array.from(vibe),
            }),
          ),
        );
      }}
    >
      <StartCombobox />
      <VibeToggleGroup />
      <StartButtonGroup />
      <p>{text}</p>
    </form>
  );
}
