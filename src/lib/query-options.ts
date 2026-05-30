import { getChatsByUserAction } from "@/server/actions/chats";
import { getFavoriteRecommendationsByUserAction } from "@/server/actions/recommendations";
import {
  QueryClient,
  queryOptions,
  defaultShouldDehydrateQuery,
} from "@tanstack/react-query";

export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 5 * 1000,
      },
      dehydrate: {
        // include pending queries in dehydration
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === "pending",
        shouldRedactErrors: (error) => {
          // We should not catch Next.js server errors
          // as that's how Next.js detects dynamic pages
          // so we cannot redact them.
          // Next.js also automatically redacts errors for us
          // with better digests.
          return false;
        },
      },
    },
  });
}

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
