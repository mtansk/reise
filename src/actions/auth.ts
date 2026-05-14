"use server";

import { signIn } from "@/lib/auth";
import { signOut as _signOut } from "@/lib/auth";

export async function signInWithGoogle() {
  await signIn("google", {
    /*     redirectTo: "/123", */
  });
}

export async function signOut() {
  await _signOut();
}
