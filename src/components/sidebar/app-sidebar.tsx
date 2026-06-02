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
import { Suspense } from "react";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
import { Sparkles } from "lucide-react";

export function AppSidebar({
  user,
  ...props
}: {
  user?: User;
} & React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader className="flex flex-row items-center gap-2 pb-4">
        <h1 className={`text-3xl font-semibold`}>
          <Link href="/">Reise.</Link>
        </h1>
      </SidebarHeader>
      <SidebarContent className="scrollbar-gutter-stable gap-1.5">
        {user && (
          <>
            <Button
              asChild
              variant={"secondary"}
              className="bg-sidebar text-primary"
            >
              <Link href="/">
                <Sparkles className="size-4" /> New Search
              </Link>
            </Button>
            <Suspense
              fallback={<SidebarSuspenseSkeleton />}
            >
              <FavoritesBlock />
              <ChatsBlock />
            </Suspense>
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

function SidebarSuspenseSkeleton() {
  return Array.from({ length: 8 }).map((_, i) => (
    <Skeleton key={i} className="h-6 w-full"></Skeleton>
  ));
}
