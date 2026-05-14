"use server";

import type {
  Vibe,
  Location,
} from "@/generated/prisma/client";
import {
  getRecommendationsPromptString,
  model,
} from "@/lib/ai";
import {
  AIRecommendation,
  aiRecommendationsArraySchema,
} from "@/lib/zod/ai";
import { generateText } from "ai";

export async function getAiRecommendations({
  location,
  vibe,
}: {
  location: Location;
  vibe: Vibe[];
}): Promise<AIRecommendation[]> {
  try {
    const prompt = getRecommendationsPromptString({
      location,
      vibe,
    });

    const response = await generateText({
      model,
      prompt,
    });

    const res = JSON.parse(response.text);
    const parsed = aiRecommendationsArraySchema.parse(res);

    return parsed;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get AI recommendations");
  }
}
