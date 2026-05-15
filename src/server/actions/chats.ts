"use server";
import "server-only";

import prisma from "../../../lib/prisma";
import { redirect } from "next/navigation";
import { actionClient } from "@/lib/safe-action";
import z from "zod";
import { revalidatePath } from "next/cache";
import { LocationSchema } from "@/lib/zod/location";
import { VibeArraySchema } from "@/lib/zod/vibe";
import { upsertLocation } from "../functions/locations";
import {
  getChatById,
  getChatsByUser,
} from "../functions/chats";
import { processRecommendation } from "../functions/recommendations";
import { getAiRecommendations } from "../functions/ai";
import { requireAuth } from "../functions/auth";

export const getChatsByUserAction = actionClient
  .use(async ({ next }) => {
    const user = await requireAuth();

    return next({
      ctx: {
        user,
      },
    });
  })
  .action(async ({ ctx }) => {
    return await getChatsByUser({
      userId: ctx.user.id,
    });
  });

export const processChatInitializationAction = actionClient
  .inputSchema(
    z.object({
      location: LocationSchema,
      vibe: VibeArraySchema,
    }),
  )
  .use(async ({ next }) => {
    const user = await requireAuth();

    return next({
      ctx: {
        user,
      },
    });
  })
  .action(async ({ parsedInput, ctx }) => {
    const { location, vibe } = parsedInput;

    const aiRecommendations = await getAiRecommendations({
      location,
      vibe,
    });

    if (!aiRecommendations) {
      throw new Error(
        "Failed to get recommendations from AI",
      );
    }

    const chatId = await prisma.$transaction(async (tx) => {
      await upsertLocation({
        location,
        tx,
      });

      const chat = await tx.chat.create({
        data: {
          userId: ctx.user.id,
          sourceLocationId: location.id,
        },
      });

      await Promise.all(
        aiRecommendations.map((r) =>
          processRecommendation({
            recommendation: r,
            sourceLocationId: location.id,
            chatId: chat.chatId,
            userId: ctx.user.id,
            vibe,
            tx,
          }),
        ),
      );

      return chat.chatId;
    });

    revalidatePath("/chat", "layout");
    redirect(`/chat/${chatId}`);
  });

export const getChatByIdAction = actionClient
  .inputSchema(z.object({ chatId: z.string() }))
  .use(async ({ next }) => {
    const user = await requireAuth();

    return next({
      ctx: {
        user,
      },
    });
  })
  .action(async ({ parsedInput, ctx }) => {
    const chat = await getChatById({
      chatId: parsedInput.chatId,
      userId: ctx.user.id,
    });

    return chat;
  });
