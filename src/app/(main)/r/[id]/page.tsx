import { getRecommendationWithLocationById } from "@/actions/recommendations";

import { auth } from "@/lib/auth";
import RecommendationCard from "@/components/recommendation/recommendation-card";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();

  const { id } = await params;

  const recommendation =
    await getRecommendationWithLocationById({
      id,
      userId: session?.user?.id || "12",
    });

  return (
    <div className="p-16 pt-4">
      <RecommendationCard recommendation={recommendation} />
    </div>
  );
}
