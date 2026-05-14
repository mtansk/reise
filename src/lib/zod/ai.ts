import { z } from "zod";

export const aiRecommendationSchema = z.object({
  cityName: z.string(),
  country: z.string(),
  vibeDescription: z.string().min(100).max(600),
  citySizeDescription: z.string().min(50).max(300),
  timingDescription: z.string().min(50).max(300),
  practicalTips: z.string().min(50).max(300),
  score: z.number().min(0).max(10),
});

export const aiRecommendationsArraySchema = z
  .array(aiRecommendationSchema)
  .length(2);

export type AIRecommendation = z.infer<
  typeof aiRecommendationSchema
>;
