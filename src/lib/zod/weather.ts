import { z } from "zod";

export const WeatherResponseSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  elevation: z.number(),
  generationtime_ms: z.number(),
  utc_offset_seconds: z.number(),
  timezone: z.string(),
  timezone_abbreviation: z.string(),
  daily: z.object({
    time: z.array(z.iso.date()),
    temperature_2m_max: z.array(z.number()),
    weather_code: z.array(z.number()),
  }),
  daily_units: z.object({
    time: z.literal("iso8601"),
    temperature_2m_max: z.literal("°C"),
    weather_code: z.literal("wmo code"),
  }),
});

export type WeatherResponse = z.infer<
  typeof WeatherResponseSchema
>;
