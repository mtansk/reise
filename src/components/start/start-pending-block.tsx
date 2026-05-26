import type { Vibe } from "@/generated/prisma/enums";
import { VibeToggle } from "../vibe/vibe-toggle";
import { Spinner } from "../ui/spinner";

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
      <Spinner className="size-8" />
    </div>
  );
}
