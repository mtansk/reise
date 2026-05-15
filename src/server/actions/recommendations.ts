"use server";
import "server-only";

import { actionClient } from "@/lib/safe-action";
import {
  getFavoriteRecommendationsByUser,
  getRecommendationsWithLocationByChatId,
  getRecommendationWithLocationById,
} from "../functions/recommendations";
import z from "zod";
import { requireAuth } from "../functions/auth";

export const getFavoriteRecommendationsByUserAction =
  actionClient
    .use(async ({ next }) => {
      const user = await requireAuth();

      return next({
        ctx: {
          user,
        },
      });
    })
    .action(async ({ ctx }) => {
      return await getFavoriteRecommendationsByUser({
        userId: ctx.user.id,
      });
    });

export const getRecommendationWithLocationByIdAction =
  actionClient
    .inputSchema(z.object({ id: z.string() }))
    .use(async ({ next }) => {
      const user = await requireAuth();

      return next({
        ctx: {
          user,
        },
      });
    })
    .action(async ({ parsedInput, ctx }) => {
      return await getRecommendationWithLocationById({
        id: parsedInput.id,
        userId: ctx.user.id,
      });
    });

export const getRecommendationsWithLocationByChatIdAction =
  actionClient
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
      return await getRecommendationsWithLocationByChatId({
        chatId: parsedInput.chatId,
        userId: ctx.user.id,
      });
    });
