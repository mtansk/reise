import {
  ArrowBigUp,
  CornerDownLeft,
  Sparkles,
} from "lucide-react";
import { Button } from "../ui/button";

export function StartButton({
  disabled,
  loading,
}: {
  disabled?: boolean;
  loading?: boolean;
}) {
  return (
    <Button
      type="submit"
      className="cursor-pointer transition-all duration-300 ease-in-out hover:scale-105"
      disabled={disabled || loading}
    >
      <Sparkles strokeWidth={2.5} />
      Start
    </Button>
  );
}
