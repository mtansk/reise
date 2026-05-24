import { getRecommendationWithLocationByIdAction } from "@/server/actions/recommendations";
import RecommendationCard from "@/components/recommendation/recommendation-card";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const recommendation = (
    await getRecommendationWithLocationByIdAction({ id })
  ).data;

  if (!recommendation) {
    throw new Error("Recommendation not found");
  }

  return (
    <div className="flex grow items-center justify-center p-16 pt-4">
      <RecommendationCard recommendation={recommendation} />
    </div>
  );
}
