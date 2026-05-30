"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

import { useEffect } from "react";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex grow flex-col items-center justify-center gap-6">
      <div className="flex w-full max-w-60 flex-col items-center justify-center gap-4">
        <h2 className="mt-4 w-full text-center text-2xl font-medium text-gray-600">
          Something went wrong!
        </h2>
        <p className="text-center text-gray-500">
          {error.message}
        </p>
      </div>

      <div className="flex flex-row gap-8">
        <Button asChild variant="ghost">
          <Link href="/">Home</Link>
        </Button>
        <Button
          onClick={() => unstable_retry()}
          className="cursor-pointer"
        >
          Try again
        </Button>
      </div>
    </div>
  );
}
