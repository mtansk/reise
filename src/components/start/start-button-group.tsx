"use client";

import { useChatStartStore } from "@/providers/chat-start-store-provider";
import { Button } from "../ui/button";

export default function StartButtonGroup() {
  const location = useChatStartStore(
    (state) => state.location,
  );
  const vibe = useChatStartStore((state) => state.vibe);

  return (
    <div>
      <Button
        type="submit"
        className="cursor-pointer transition-all duration-300 ease-in-out hover:scale-105"
        /*        disabled={!location || vibe.size === 0} */
      >
        Start
      </Button>
    </div>
  );
}
