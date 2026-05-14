"use server";

import { Prisma } from "@/generated/prisma/client";
import prisma from "../../lib/prisma";
import type {
  Chat as ChatModel,
  Vibe,
  Location,
} from "@/generated/prisma/client";
import { auth } from "@/lib/auth";
import { getAiRecommendations } from "./ai-actions";
import {
  getPhotonLocationData,
  upsertLocation,
} from "./locations";
import { getUnsplashPhotosForLocation } from "./photos";
import { AIRecommendation } from "@/lib/zod/ai";
import { Session } from "next-auth";
import { redirect } from "next/navigation";
import { actionClient } from "@/lib/safe-action";
import z from "zod";
import { QueryClient } from "@tanstack/react-query";
import { revalidatePath } from "next/cache";

const chatArgs = {
  include: {
    sourceLocation: true,
  },
} satisfies Prisma.ChatDefaultArgs;

export type Chat = Prisma.ChatGetPayload<typeof chatArgs>;

export async function getChats(
  userId: string,
): Promise<Chat[]> {
  return await prisma.chat.findMany({
    where: {
      userId: userId,
    },
    ...chatArgs,
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function createChat({
  userId,
  sourceLocationId,
}: {
  userId: string;
  sourceLocationId: string;
}): Promise<ChatModel> {
  const chat = await prisma.chat.create({
    data: {
      userId,
      sourceLocationId,
    },
  });

  return chat;
}

export async function initializeChat({
  location,
  vibe,
}: {
  location: Location;
  vibe: Vibe[];
}) {
  const session = await auth();

  if (!session?.user?.id || !session.user) {
    throw new Error("Unauthorized");
  }

  await upsertLocation({
    location,
  });

  const chat = await createChat({
    userId: session.user.id,
    sourceLocationId: location.id,
  });

  const recommendations = await getAiRecommendations({
    location,
    vibe,
  });

  await Promise.all(
    recommendations.map((r) =>
      processRecommendation({
        recommendation: r,
        sourceLocation: location,
        chat: chat,
        session: session,
        vibe: vibe,
      }),
    ),
  );

  revalidatePath("/chat", "layout");

  redirect(`/chat/${chat.chatId}`);
}

async function processRecommendation({
  recommendation,
  sourceLocation,
  chat,
  session,
  vibe,
}: {
  recommendation: AIRecommendation;
  sourceLocation: Location;
  chat: ChatModel;
  session: Session;
  vibe: Vibe[];
}) {
  const location = await getPhotonLocationData({
    city: recommendation.cityName,
    country: recommendation.country,
  });

  console.log(location);

  if (!location) {
    return;
  }

  await upsertLocation({
    location,
  });

  const data = {
    locationId: location.id,
    sourceLocationId: sourceLocation.id,
    chatId: chat.chatId,
    userId: session.user!.id as string,
    vibe: vibe,
    vibeDescription: recommendation.vibeDescription,
    citySizeDescription: recommendation.citySizeDescription,
    timingDescription: recommendation.timingDescription,
    practicalTips: recommendation.practicalTips,
    score: recommendation.score,
  };

  console.log(data);

  await prisma.recommendation.create({
    data: data,
  });
}

export const getChatById = actionClient
  .inputSchema(z.object({ chatId: z.string() }))
  .use(async ({ next }) => {
    const session = await auth();

    if (!session?.user?.id || !session.user) {
      throw new Error("Unauthorized");
    }

    return next({
      ctx: {
        user: session.user,
      },
    });
  })
  .action(async ({ parsedInput, ctx }) => {
    return await prisma.chat.findUnique({
      where: {
        chatId: parsedInput.chatId,
        userId: ctx.user.id,
      },
      ...chatArgs,
    });
  });
