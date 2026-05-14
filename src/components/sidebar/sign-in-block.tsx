"use client";

import GoogleLogo from "../google-logo";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { signInWithGoogle } from "@/actions/auth";
import { useState } from "react";
import { Spinner } from "../ui/spinner";

export default function SignInBlock() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <SidebarMenu className="flex flex-col gap-2">
      <span className="text-center text-sm">
        Access recommendations across all your devices by
        signing in.
      </span>
      <SidebarMenuItem>
        <SidebarMenuButton
          className="flex h-auto cursor-pointer flex-row gap-4"
          onClick={async () => {
            setIsLoading(true);
            await signInWithGoogle();
          }}
          disabled={isLoading}
        >
          {!isLoading && <GoogleLogo className="size-8!" />}
          {isLoading && <Spinner className="size-8!" />}
          <span className="font-semibold transition-colors duration-500">
            Sign in with Google
          </span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
