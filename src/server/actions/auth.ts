"use server";
import "server-only";

import { auth, signIn } from "@/lib/auth";
import { signOut as _signOut } from "@/lib/auth";
import { actionClient } from "@/lib/safe-action";

export async function signInWithGoogle() {
  const guest = await auth();

  await _signOut({
    redirect: false,
  });

  await signIn("google", {
    redirect: true,
    redirectTo: `/api/auth2/merge?guestId=${encodeURIComponent(
      guest?.user?.id ?? "",
    )}`,
  });
}

export async function signOut() {
  await _signOut();
}

export const signInAsGuest = actionClient.stateAction(
  async () => {
    await signIn("credentials", {});
  },
);
