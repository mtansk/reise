import type {
  Location,
  Vibe,
} from "@/generated/prisma/client";
import { createGoogleGenerativeAI } from "@ai-sdk/google";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const model = google("gemini-3.1-flash-lite");

export function getRecommendationsPromptString({
  location,
  vibe,
  excludedLocations,
}: {
  location: Location;
  vibe: Vibe[];
  excludedLocations?: Location[];
}) {
  return `
  ### ROLE
  You are an expert Travel Planner specializing in day trips. Your goal is to find 2 perfect destinations for a user based on their location and desired "vibe".

  ### CONTEXT
  - User Location: ${location.name}, ${location.country}
  - Desired Vibes: ${vibe.join(", ")}
  - Current Date/Season: ${new Date().toLocaleDateString()}
  
  ### CONSTRAINTS
  1. TRAVEL LIMIT: Destinations must be reachable within 3 hours by car or public transport from ${location.name}. Do not mention travel time in the output.
  2. UNIQUENESS: Do not recommend ${location.name} itself.
  3. QUANTITY: Exactly 2 recommendations.
  4. LANGUAGE: Everything must be in English. Use simple and clear language, aim at young adults.
  5. EXCLUDED LOCATIONS: Do not recommend ${excludedLocations?.map((location) => location.name).join(", ")}. Do not mention excluded locations in the output.

  ### OUTPUT FORMAT
  Return ONLY a valid JSON array of 2 objects. No markdown blocks, no preamble. 
  
  ### JSON SCHEMA
  [
    {
      "cityName": "string (English)",
      "country": "string (English)",
      "vibeDescription": "4 sentences explaining why it matches vibes: ${vibe.join(", ")}.",
      "citySizeDescription": "2-3 short sentences about scale and walkability.",
      "timingDescription": "2-3 short sentences: how many hours to spend and what's the pace.",
      "practicalTips": "2-3 short specific tips (e.g., best transport or a hidden spot).",
      "score": "number (0-10) based on vibe match accuracy"
    }
  ]

  ### INSTRUCTIONS FOR CONTENT
  - Be specific. Instead of "nice architecture", say "Baroque style facades in the old town".
  - For timingDescription, consider the 3-hour travel time. Ensure the user actually has time to see something.
  - If multiple cities fit, prioritize the one that contrast with ${location.name} to provide a fresh experience.
  - The score must be adequate to the vibe match accuracy. If you are given excluded locations, score the city in comparison to the excluded locations. Give high scores to cities that are actually good for the given vibes and low scores to cities that are not. 
`;
}
