import "server-only";

import { auth, signOut } from "@/lib/auth";
import { UserWithIdSchema } from "@/lib/zod/user";
import prisma from "../../../lib/prisma";

export async function requireAuth() {
  const session = await auth();

  const user = UserWithIdSchema.safeParse(session?.user);

  if (!user?.success || !user.data.id) {
    throw new Error("Unauthorized");
  }

  return user.data;
}

export async function createGuestUser() {
  return await prisma.user.create({
    data: {
      email: `${crypto.randomUUID()}@guest.com`,
      isGuest: true,
    },
  });
}

export async function mergeGuestWithUser({
  guestId,
  userId,
}: {
  guestId: string;
  userId: string;
}) {
  await prisma.$transaction(async (prisma) => {
    const guestRaw = await prisma.user.findUnique({
      where: {
        id: guestId,
        isGuest: true,
      },
    });

    if (!guestRaw) {
      throw new Error("Guest not found");
    }

    const guest = UserWithIdSchema.parse(guestRaw);

    await prisma.chat.updateMany({
      where: { userId: guest.id },
      data: { userId },
    });

    await prisma.recommendation.updateMany({
      where: { userId: guest.id },
      data: { userId },
    });

    await prisma.user.delete({
      where: { id: guest.id },
    });
  });

  return true;
}

export async function deleteUserAndAllData({
  userId,
}: {
  userId: string;
}) {
  await prisma.$transaction(async (prisma) => {
    await prisma.recommendation.deleteMany({
      where: { userId },
    });

    await prisma.chat.deleteMany({
      where: { userId },
    });

    await prisma.account.deleteMany({
      where: { userId },
    });

    await prisma.user.delete({
      where: { id: userId },
    });
  });

  await signOut();

  return true;
}
