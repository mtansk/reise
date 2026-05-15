import z from "zod";

export const VIBES = [
  "history",
  "partying",
  "nature",
  "family",
  "culture",
  "shopping",
] as const;

export const VibeArraySchema = z
  .array(z.enum(VIBES))
  .refine((arr) => new Set(arr).size === arr.length, {
    message: "Vibe array must contain unique values",
  });
