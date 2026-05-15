import "server-only";

import { Vibe } from "@/generated/prisma/enums";
import {
  getRecommendationsPromptString,
  model,
} from "@/lib/ai";
import {
  AIRecommendation,
  aiRecommendationsArraySchema,
} from "@/lib/zod/ai";
import { generateText } from "ai";
import { Location } from "@/generated/prisma/client";

export async function getAiRecommendations({
  location,
  vibe,
  excludedLocations,
}: {
  location: Location;
  vibe: Vibe[];
  excludedLocations?: Location[];
}): Promise<AIRecommendation[]> {
  console.log("AI started");
  const prompt = getRecommendationsPromptString({
    location,
    vibe,
    excludedLocations,
  });

  const response = await generateText({
    model,
    prompt,
  });

  const res = JSON.parse(response.text);

  console.log(res);
  const parsed = aiRecommendationsArraySchema.parse(res);

  return parsed;
}
