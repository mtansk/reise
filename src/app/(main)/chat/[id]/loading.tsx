import { RecommendationCardSkeleton } from "@/components/recommendation/recommendation-card";

export default async function Loading() {
  return (
    <div className="flex grow justify-center p-4">
      <div className="flex w-full max-w-200 grow flex-row flex-wrap justify-center gap-12">
        {[0, 0].map((_, i) => (
          <RecommendationCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
