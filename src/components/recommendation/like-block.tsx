"use client";

import { Heart } from "lucide-react";
import clsx from "clsx";
import { toggleIsFavoriteAction } from "@/server/actions/recommendations";
import { favoriteRecommendationsQueryOptions } from "@/lib/query-options";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { RecommendationWithLocation } from "@/server/functions/recommendations";
import { ParticleEffect } from "../vibe/particle-effect";

export default function LikeBlock({
  recommendation,
}: {
  recommendation: RecommendationWithLocation;
}) {
  const queryClient = useQueryClient();

  const { data: favorites } = useQuery(
    favoriteRecommendationsQueryOptions(),
  );

  const isFavorite = favorites?.some(
    (favorite) =>
      favorite.recommendationId ===
      recommendation.recommendationId,
  );

  const { mutate: toggleIsFavorite } = useMutation({
    mutationFn: async () =>
      await toggleIsFavoriteAction({
        recommendationId: recommendation.recommendationId,
        newFavoriteState: !isFavorite,
      }),

    onMutate: async () => {
      const key =
        favoriteRecommendationsQueryOptions().queryKey;

      await queryClient.cancelQueries({
        queryKey: key,
      });

      const previousFavorites =
        queryClient.getQueryData(key);

      const newFavorites =
        isFavorite ?
          previousFavorites?.filter(
            (favorite) =>
              favorite.recommendationId !==
              recommendation.recommendationId,
          )
        : [
            ...(previousFavorites ?? []),
            {
              ...recommendation,
              isFavorite: true,
            },
          ];

      queryClient.setQueryData(key, newFavorites);
      return { previousFavorites };
    },

    onSettled: (result, error, vars, context) => {
      if (result?.serverError) {
        const key =
          favoriteRecommendationsQueryOptions().queryKey;

        queryClient.setQueryData(
          key,
          context?.previousFavorites,
        );
      }

      queryClient.invalidateQueries({
        queryKey:
          favoriteRecommendationsQueryOptions().queryKey,
      });
    },
  });

  const className = clsx(
    "size-8 transition-all duration-300",
    isFavorite ? "text-red-500" : "text-gray-300",
    "hover:scale-110 hover:text-red-500",
  );

  return (
    <div>
      <ParticleEffect
        icon={Heart}
        colorClass="text-red-500"
      >
        <button
          className="px-1"
          onClick={() => {
            toggleIsFavorite();
          }}
        >
          <Heart className={className} />
        </button>
      </ParticleEffect>
    </div>
  );
}
