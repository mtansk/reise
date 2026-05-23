"use client";

import type { Vibe } from "@/generated/prisma/client";
import { VIBES } from "@/lib/zod/vibe";
import { useState } from "react";
import { VibeToggle } from "../start/vibe-toggle";
import { Button } from "../ui/button";
import { processNewRecommendationsForChatAction } from "@/server/actions/chats";
import { toast } from "sonner";

export default function ChatContinueForm({
  chatId,
}: {
  chatId: string;
}) {
  const [vibe, setVibe] = useState<Set<Vibe>>(new Set());

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
    <div className="via-background to-background sticky bottom-0 flex w-full flex-row items-center justify-center bg-linear-to-b from-transparent">
      <div className="bg-background ring-accent mb-2 flex flex-row items-center justify-center gap-4 rounded-2xl border px-8 py-4 shadow-2xl">
        <div className="bg-background flex max-w-md flex-wrap items-center justify-center gap-3">
          {VIBES.map((_vibe) => (
            <VibeToggle
              key={_vibe}
              vibe={_vibe}
              pressed={vibe.has(_vibe)}
              onPressedChange={() => toggleVibe(_vibe)}
            />
          ))}
        </div>
        <Button
          /* type="submit" */
          className="cursor-pointer transition-all duration-300 ease-in-out hover:scale-105"
          /*        disabled={!location || vibe.size === 0} */
          onClick={async () => {
            /*     const res =
              await processNewRecommendationsForChatAction({
                chatId,
                vibe: Array.from(vibe),
              });
            console.log(res); */
            toast.error(
              "New recommendations will appear here.",
            );
          }}
        >
          Search
        </Button>
      </div>
    </div>
  );
}
