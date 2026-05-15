"use server";
import "server-only";

import { actionClient } from "@/lib/safe-action";
import z from "zod";
import { getWeatherForLocation } from "../functions/weather";

export const getWeatherForLocationAction = actionClient
  .inputSchema(
    z.object({
      lat: z.number(),
      lng: z.number(),
    }),
  )
  .action(async ({ parsedInput }) => {
    const { lat, lng } = parsedInput;

    const data = await getWeatherForLocation({ lat, lng });

    if (!data) {
      throw new Error("Failed to fetch weather data");
    }

    return data;
  });
