import { getRecommendationsWithLocationByChatIdAction } from "@/server/actions/recommendations";
import RecommendationCard from "@/components/recommendation/recommendation-card";
import { auth } from "@/lib/auth";
import ChatContinueForm from "@/components/chat/chat-continue-form";

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
    <>
      <div className="flex flex-row flex-wrap justify-center gap-12 py-4">
        {recommendations?.map((r) => (
          <RecommendationCard
            key={r.recommendationId}
            recommendation={r}
          />
        ))}
      </div>
      <ChatContinueForm chatId={id} />
    </>
  );
}
