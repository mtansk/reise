import type { Vibe } from "@/generated/prisma/enums";
import { Sparkles } from "lucide-react";
import { VibeToggle } from "../vibe/vibe-toggle";

export function StartPendingBlock({
  vibe,
}: {
  vibe: Vibe[];
}) {
  return (
    <div className="animate-in fade-in zoom-in flex flex-col items-center justify-center gap-8 duration-700">
      <div className="flex flex-wrap items-center justify-center gap-4">
        {vibe.map((_vibe) => (
          <VibeToggle
            key={_vibe}
            vibe={_vibe}
            pressed={true}
          />
        ))}
      </div>
      <div className="text-foreground flex items-center gap-3 text-xl font-medium">
        <Sparkles
          className="animate-pulse text-purple-400"
          size={32}
        />
        <span className="animate-pulse">Thinking...</span>
      </div>
    </div>
  );
}
