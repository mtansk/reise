"use client";

import { User } from "next-auth";
import SignInBlock from "./sign-in-block";
import { SignedInBlock } from "./signed-in-block";

export function NavUser({ user }: { user?: User }) {
  if (!user) {
    return <SignInBlock />;
  }

  return <SignedInBlock user={user} />;
}
