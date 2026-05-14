"use client";

import { ChevronDown, Heart } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  CollapsibleTrigger,
  CollapsibleContent,
  Collapsible,
} from "../ui/collapsible";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getChats } from "@/actions/chats";
import Logo from "../logo-wrapped";
import { User } from "next-auth";
import { NavUser } from "./nav-user";
import { getFavoriteRecommendationsByUser } from "@/actions/recommendations";

export function AppSidebar({
  user,
  ...props
}: {
  user?: User;
} & React.ComponentProps<typeof Sidebar>) {
  const { data: chats } = useQuery({
    queryKey: ["chats"],
    queryFn: () => getChats(user?.id || "12"),
  });

  const { data: favorites } = useQuery({
    queryKey: ["favorites"],
    queryFn: () =>
      getFavoriteRecommendationsByUser(user?.id || "12"),
  });

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader className="flex flex-row items-center gap-2 pb-4">
        <Logo className="h-12 w-12" />
        <span className={`text-3xl font-semibold`}>
          Trip AI
        </span>
      </SidebarHeader>
      <SidebarContent className="scrollbar-gutter-stable gap-1.5">
        <Collapsible
          defaultOpen
          className="group/collapsible"
        >
          <SidebarGroup className="p-1">
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger
                className="cursor-pointer"
                asChild
              >
                <SidebarMenuButton size="sm">
                  Favorites
                  <ChevronDown className="ml-auto rotate-90 transition-transform group-data-[state=open]/collapsible:rotate-0" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarMenu>
                {favorites?.map((fav) => (
                  <SidebarMenuItem
                    key={fav.recommendationId}
                    className="group/item relative"
                  >
                    <SidebarMenuButton
                      asChild
                      size="default"
                      className="text-gray-600"
                    >
                      <Link
                        href={`/r/${fav.recommendationId}`}
                      >
                        <span className="truncate">
                          {fav.destinationLocation.name}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                    <SidebarMenuAction className="opacity-0 transition-opacity duration-200 group-hover/item:opacity-100">
                      <Heart
                        className="size-4! cursor-pointer text-red-400"
                        fill="red"
                        size={20}
                      />
                    </SidebarMenuAction>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
        <Collapsible
          defaultOpen
          className="group/collapsible"
        >
          <SidebarGroup className="p-1">
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger
                className="cursor-pointer"
                asChild
              >
                <SidebarMenuButton size="sm">
                  Origins
                  <ChevronDown className="ml-auto rotate-90 transition-transform group-data-[state=open]/collapsible:rotate-0" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarMenu>
                {chats?.map((chat) => (
                  <SidebarMenuItem key={chat.chatId}>
                    <SidebarMenuButton
                      asChild
                      size="default"
                      className="text-gray-600"
                    >
                      <Link href={`/chat/${chat.chatId}`}>
                        <span className="truncate">
                          {chat.sourceLocation.name}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
