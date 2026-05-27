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
      <div className="flex grow justify-center p-4">
        <div className="flex w-full max-w-200 grow flex-row flex-wrap justify-center gap-12">
          {recommendations?.map((r, i) => (
            <RecommendationCard
              key={r.recommendationId}
              recommendation={r}
              latest={i === recommendations.length - 1}
            />
          ))}
        </div>
      </div>
      <ChatContinueForm
        chatId={id}
        count={recommendations?.length}
      />
    </>
  );
}
