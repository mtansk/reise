import "server-only";

import { Prisma } from "@/generated/prisma/client";
import prisma from "../../../lib/prisma";

const chatArgs = {
  include: {
    sourceLocation: true,
  },
} satisfies Prisma.ChatDefaultArgs;

export type Chat = Prisma.ChatGetPayload<typeof chatArgs>;

export async function getChatsByUser({
  userId,
}: {
  userId: string;
}): Promise<Chat[]> {
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

export async function getChatById({
  chatId,
  userId,
}: {
  chatId: string;
  userId: string;
}) {
  return await prisma.chat.findUnique({
    where: {
      chatId: chatId,
      userId: userId,
    },
    ...chatArgs,
  });
}
