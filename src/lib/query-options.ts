import { getChatsByUserAction } from "@/server/actions/chats";
import { getFavoriteRecommendationsByUserAction } from "@/server/actions/recommendations";
import { queryOptions } from "@tanstack/react-query";

export function chatsQueryOptions() {
  return queryOptions({
    queryKey: ["chats"],
    queryFn: async () =>
      (await getChatsByUserAction()).data ?? [],
  });
}
export function favoriteRecommendationsQueryOptions() {
  return queryOptions({
    queryKey: ["favorites"],
    queryFn: async () =>
      (await getFavoriteRecommendationsByUserAction())
        .data ?? [],
  });
}
