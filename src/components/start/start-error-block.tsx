import { ServerCrash } from "lucide-react";
import { Button } from "../ui/button";

export function StartErrorBlock({
  reset,
}: {
  reset: () => void;
}) {
  return (
    <div className="animate-in fade-in zoom-in flex flex-col items-center justify-center gap-6 duration-500">
      <div className="flex items-center gap-3 text-xl text-gray-500">
        <ServerCrash size={32} />
        <span>AI is unavailable. Please, try again</span>
      </div>
      <Button
        onClick={() => reset()}
        variant="outline"
        size="lg"
        className="rounded-full px-8"
      >
        Ok
      </Button>
    </div>
  );
}
