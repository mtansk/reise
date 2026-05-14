"use server";

import { Prisma } from "@/generated/prisma/client";
import prisma from "../../lib/prisma";

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

export async function getFavoriteRecommendationsByUser(
  userId: string,
): Promise<RecommendationWithLocation[]> {
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

//
// Recommendations with photos
//

const recommendationWithPhotosArgs = {
  include: {
    sourceLocation: true,
    destinationLocation: {
      include: {
        photos: true,
      },
    },
  },
} satisfies Prisma.RecommendationDefaultArgs;

export type RecommendationWithPhotos =
  Prisma.RecommendationGetPayload<
    typeof recommendationWithPhotosArgs
  >;

export async function getRecommendationWithPhotosById({
  id,
  userId,
}: {
  id: string;
  userId: string;
}): Promise<RecommendationWithPhotos | null> {
  return await prisma.recommendation.findUnique({
    where: {
      recommendationId: id,
      userId: userId,
    },
    ...recommendationWithPhotosArgs,
  });
}

export async function getRecommendationsByChatId({
  chatId,
  userId,
}: {
  chatId: string;
  userId: string;
}): Promise<RecommendationWithPhotos[]> {
  return await prisma.recommendation.findMany({
    where: {
      chatId: chatId,
      userId: userId,
    },
    ...recommendationWithPhotosArgs,
  });
}
