"use client";

import { chatsQueryOptions } from "@/lib/query-options";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { useSuspenseQuery } from "@tanstack/react-query";

export function ChatsBlock() {
  const { data: chats } = useSuspenseQuery(
    chatsQueryOptions(),
  );

  return (
    <Collapsible defaultOpen className="group/collapsible">
      <SidebarGroup className="p-1">
        <SidebarGroupLabel asChild>
          <CollapsibleTrigger
            className="cursor-pointer"
            asChild
          >
            <SidebarMenuButton
              size="sm"
              className="text-gray-900"
            >
              Origins
              <ChevronDown className="ml-auto rotate-90 transition-transform group-data-[state=open]/collapsible:rotate-0" />
            </SidebarMenuButton>
          </CollapsibleTrigger>
        </SidebarGroupLabel>
        <CollapsibleContent>
          <SidebarMenu>
            {chats?.map((chat, i) => (
              <SidebarMenuItem key={chat.chatId}>
                <SidebarMenuButton
                  asChild
                  size="default"
                  className="text-gray-600"
                >
                  <Link
                    href={`/chat/${chat.chatId}`}
                    prefetch={i < 5}
                  >
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
  );
}
