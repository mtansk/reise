import "server-only";

import { auth } from "@/lib/auth";
import { UserWithIdSchema } from "@/lib/zod/user";

export async function requireAuth() {
  const session = await auth();

  const user = UserWithIdSchema.parse(session?.user);

  if (!user?.id) {
    throw new Error("Unauthorized");
  }

  return user;
}
