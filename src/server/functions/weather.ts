import "server-only";

import {
  WeatherResponse,
  WeatherResponseSchema,
} from "@/lib/zod/weather";

export async function getWeatherForLocation({
  lat,
  lng,
}: {
  lat: number;
  lng: number;
}): Promise<WeatherResponse | null> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&daily=temperature_2m_max,weather_code&timezone=auto`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      tags: [`weather-${lat}-${lng}`],
      revalidate: 60 * 60,
    },
    cache: "force-cache",
  });

  const data = await res.json();

  const parsedData: WeatherResponse =
    WeatherResponseSchema.parse(data);

  return parsedData;
}
