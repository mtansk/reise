"use client";

import { favoriteRecommendationsQueryOptions } from "@/lib/query-options";
import { useSuspenseQuery } from "@tanstack/react-query";
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

export function FavoritesBlock() {
  const { data: favorites } = useSuspenseQuery(
    favoriteRecommendationsQueryOptions(),
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
                    href={`/rec/${fav.recommendationId}`}
                  >
                    <span className="truncate">
                      {fav.destinationLocation.name}
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
