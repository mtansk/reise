import type { Location } from "@/generated/prisma/client";
import { z } from "zod";

const allowedTypes = ["city", "town", "village", "hamlet"];

export const PhotonResponseSchema = z.object({
  type: z.literal("FeatureCollection"),
  features: z
    .array(
      z.object({
        properties: z.object({
          osm_id: z.number(),
          name: z.string(),
          country: z.string(),
          osm_value: z.string(),
          state: z.string().optional(),
        }),
        geometry: z.object({
          coordinates: z.tuple([z.number(), z.number()]),
        }),
      }),
    )
    .transform((list): Location[] =>
      list
        .filter((f) =>
          allowedTypes.includes(f.properties.osm_value),
        )
        .map((f) => ({
          id: f.properties.osm_id.toString(),
          name: f.properties.name,
          country: f.properties.country,
          lat: f.geometry.coordinates[1],
          lng: f.geometry.coordinates[0],
        })),
    ),
});

export type PhotonResponse = z.infer<
  typeof PhotonResponseSchema
>;

export const LocationSchema = z.object({
  id: z.string(),
  name: z.string(),
  country: z.string(),
  lat: z.number(),
  lng: z.number(),
}) satisfies z.ZodType<Location>;

export const VIBES = [
  "history",
  "partying",
  "nature",
  "family",
  "culture",
  "shopping",
] as const;

export const LocationWithVibeSchema = LocationSchema.extend(
  {
    vibe: z
      .array(z.enum(VIBES))
      .nonempty()
      .refine((arr) => new Set(arr).size === arr.length, {
        message: "Vibe array must contain unique values",
      }),
  },
);

export type LocationWithVibe = z.infer<
  typeof LocationWithVibeSchema
>;
