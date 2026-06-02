import { interTight } from "@/app/fonts";
import clsx from "clsx";
import { Suspense } from "react";
import { Header } from "@/components/header";
import { getRecommendationWithLocationByIdAction } from "@/server/actions/recommendations";
import { Skeleton } from "@/components/ui/skeleton";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await params;

  return (
    <>
      <Header>
        <Suspense
          fallback={<Skeleton className="h-6 w-32" />}
        >
          <HeaderInset recommendationId={id} />
        </Suspense>
      </Header>

      {children}
    </>
  );
}

async function HeaderInset({
  recommendationId,
}: {
  recommendationId: string;
}) {
  const action =
    await getRecommendationWithLocationByIdAction({
      id: recommendationId,
    });
  const recommendation = action.data;

  return (
    <h2 className={clsx(interTight.className, "text-2xl")}>
      {recommendation ?
        `From ${recommendation.sourceLocation.name}`
      : "Not Found"}
    </h2>
  );
}
