"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
    SidebarHeader,
  } from "@/components/ui/sidebar";
import Link from "next/link";
import { User } from "next-auth";
import { NavUser } from "./nav-user";
import { FavoritesBlock } from "./favorites-block";
import { ChatsBlock } from "./chats-block";

export function AppSidebar({
  user,
  ...props
}: {
  user?: User;
} & React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader className="flex flex-row items-center gap-2 pb-4">
        <span className={`text-3xl font-semibold`}>
          <Link href="/">Reise.</Link>
        </span>
      </SidebarHeader>
      <SidebarContent className="scrollbar-gutter-stable gap-1.5">
        {user && (
          <>
            <FavoritesBlock />
            <ChatsBlock />
          </>
        )}
        {!user && (
          <p className="mt-4 w-full text-center text-sm text-gray-500">
            There is nothing yet
          </p>
        )}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
