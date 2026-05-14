"use server";

import {
  WeatherResponse,
  WeatherResponseSchema,
} from "@/lib/zod/weather";
import { cacheLife, cacheTag } from "next/cache";

export async function getWeatherForLocation({
  lat,
  lng,
}: {
  lat: number;
  lng: number;
}): Promise<WeatherResponse | null> {
  "use cache";
  cacheLife("hours");
  cacheTag(`weather-${lat}-${lng}`);

  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&daily=temperature_2m_max,weather_code&timezone=auto`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        tags: [`weather-${lat}-${lng}`],
      },
    });

    const data = await res.json();

    const parsedData: WeatherResponse =
      WeatherResponseSchema.parse(data);

    return parsedData;
  } catch (e) {
    throw new Error("Failed to fetch weather data");
  }
}
