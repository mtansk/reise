import { getRecommendationsWithLocationByChatIdAction } from "@/server/actions/recommendations";
import RecommendationCard from "@/components/recommendation/recommendation-card";
import ChatContinueForm from "@/components/chat/chat-continue-form";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const recommendations = (
    await getRecommendationsWithLocationByChatIdAction({
      chatId: id,
    })
  ).data;

  return (
    <>
      <div className="flex grow flex-row flex-wrap justify-center gap-12 py-4">
        {recommendations?.map((r, i) => (
          <RecommendationCard
            key={r.recommendationId}
            recommendation={r}
            latest={i === recommendations.length - 1}
          />
        ))}
      </div>
      <div id="bottom"></div>
      <ChatContinueForm
        chatId={id}
        count={recommendations?.length}
      />
    </>
  );
}
