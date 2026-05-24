import { interTight } from "@/app/layout";
import clsx from "clsx";
import { Suspense } from "react";
import { Header } from "@/components/header";
import { getRecommendationWithLocationByIdAction } from "@/server/actions/recommendations";

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

  const recommendation = (
    await getRecommendationWithLocationByIdAction({ id })
  ).data;

  if (!recommendation) {
    throw new Error("Recommendation not found");
  }

  return (
    <>
      <Header>
        <h2
          className={clsx(interTight.className, "text-2xl")}
        >
          {`From ${recommendation.sourceLocation.name}`}
        </h2>
      </Header>
      <Suspense
        fallback={
          <div className="flex h-screen items-center justify-center">
            Loading...
          </div>
        }
      >
        {children}
      </Suspense>
    </>
  );
}
