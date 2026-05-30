"use client";

import Error from "@/components/pages/error-page";

export default function ErrorPage({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <Error error={error} unstable_retry={unstable_retry} />
  );
}
