import { Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export function StartButton({
  disabled,
  loading,
  title = "Start",
  className,
  size,
}: {
  disabled?: boolean;
  loading?: boolean;
  title?: string;
  className?: string;
  size?: Parameters<typeof Button>[0]["size"];
}) {
  return (
    <Button
      type="submit"
      className={cn(
        "cursor-pointer transition-all duration-300 ease-in-out hover:scale-105",
        className,
      )}
      disabled={disabled || loading}
      size={size}
    >
      <Sparkles strokeWidth={2} />
      {title}
    </Button>
  );
}
