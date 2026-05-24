"use client";

import type { Vibe } from "@/generated/prisma/client";
import { VIBES } from "@/lib/zod/vibe";
import { useChatStartStore } from "@/providers/chat-start-store-provider";
import { VibeToggle } from "../vibe/vibe-toggle";

export default function VibeToggleGroup() {
  const vibe = useChatStartStore((state) => state.vibe);
  const setVibe = useChatStartStore(
    (state) => state.actions.setVibe,
  );

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
    <div className="flex max-w-md flex-wrap items-center justify-center gap-3">
      {VIBES.map((_vibe) => (
        <VibeToggle
          key={_vibe}
          vibe={_vibe}
          pressed={vibe.has(_vibe)}
          onPressedChange={() => toggleVibe(_vibe)}
        />
      ))}
    </div>
  );
}
