"use server";
import "server-only";

import { signIn } from "@/lib/auth";
import { signOut as _signOut } from "@/lib/auth";

export async function signInWithGoogle() {
  await signIn("google", {});
}

export async function signOut() {
  await _signOut();
}
