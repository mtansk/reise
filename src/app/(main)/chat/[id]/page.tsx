import { getRecommendationsWithLocationByChatIdAction } from "@/server/actions/recommendations";
import RecommendationCard from "@/components/recommendation/recommendation-card";
import { auth } from "@/lib/auth";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    return null;
  }

  const recommendations = (
    await getRecommendationsWithLocationByChatIdAction({
      chatId: id,
    })
  ).data;

  return (
    <div className="flex flex-row justify-center gap-12">
      {recommendations?.map((r) => (
        <RecommendationCard
          key={r.recommendationId}
          recommendation={r}
        />
      ))}
    </div>
  );
}
