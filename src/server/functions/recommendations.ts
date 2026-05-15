import "server-only";

import {
  Prisma,
  Recommendation,
  Vibe,
} from "@/generated/prisma/client";
import prisma from "../../../lib/prisma";
import { AIRecommendation } from "@/lib/zod/ai";
import {
  getPhotonLocationData,
  upsertLocation,
} from "./locations";

const recommendationsWithLocationArgs = {
  include: {
    destinationLocation: true,
    sourceLocation: true,
  },
} satisfies Prisma.RecommendationDefaultArgs;

export type RecommendationWithLocation =
  Prisma.RecommendationGetPayload<
    typeof recommendationsWithLocationArgs
  >;

export async function getFavoriteRecommendationsByUser({
  userId,
}: {
  userId: string;
}): Promise<RecommendationWithLocation[]> {
  return await prisma.recommendation.findMany({
    where: {
      userId: userId,
      isFavorite: true,
    },
    ...recommendationsWithLocationArgs,
  });
}

export async function getRecommendationWithLocationById({
  id,
  userId,
}: {
  id: string;
  userId: string;
}): Promise<RecommendationWithLocation | null> {
  return await prisma.recommendation.findUnique({
    where: {
      recommendationId: id,
      userId: userId,
    },
    ...recommendationsWithLocationArgs,
  });
}

export async function getRecommendationsWithLocationByChatId({
  chatId,
  userId,
}: {
  chatId: string;
  userId: string;
}): Promise<RecommendationWithLocation[]> {
  return await prisma.recommendation.findMany({
    where: {
      chatId: chatId,
      userId: userId,
    },
    ...recommendationsWithLocationArgs,
  });
}

export async function processRecommendation({
  recommendation,
  sourceLocationId,
  chatId,
  userId,
  vibe,
  tx,
}: {
  recommendation: AIRecommendation;
  sourceLocationId: string;
  chatId: string;
  userId: string;
  vibe: Vibe[];
  tx: Prisma.TransactionClient;
}): Promise<Recommendation | null> {
  const location = await getPhotonLocationData({
    city: recommendation.cityName,
    country: recommendation.country,
  });

  console.log(location);

  if (!location) {
    throw new Error("Failed to get location");
  }

  await upsertLocation({
    location,
    tx,
  });

  const data: Prisma.RecommendationUncheckedCreateInput = {
    locationId: location.id,
    sourceLocationId: sourceLocationId,
    chatId: chatId,
    userId: userId,
    vibe: vibe,
    vibeDescription: recommendation.vibeDescription,
    citySizeDescription: recommendation.citySizeDescription,
    practicalTips: recommendation.practicalTips,
    score: recommendation.score,
    timingDescription: recommendation.timingDescription,
  };

  const createdRecommendation =
    await tx.recommendation.create({
      data: data,
    });

  if (!createdRecommendation) {
    throw new Error("Failed to create recommendation");
  }

  return createdRecommendation;
}
