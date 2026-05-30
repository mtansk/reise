import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex grow flex-col items-center justify-center gap-6">
      <div className="flex w-full max-w-60 flex-col items-center justify-center gap-4">
        <h2 className="mt-4 w-full text-center text-2xl font-medium text-gray-600">
          {`This page doesn't seem to exist!`}
        </h2>
      </div>
      <div className="flex flex-row gap-8">
        <Button asChild variant="ghost">
          <Link href="/">Home</Link>
        </Button>
      </div>
    </div>
  );
}
