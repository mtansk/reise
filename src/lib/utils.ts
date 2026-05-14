import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getWeatherIconName({
  code,
}: {
  code: number;
}): "sun" | "cloudy" | "cloud-rain" | "snowflake" {
  if (code === 0) return "sun";

  if (code >= 1 && code <= 3) return "cloudy";

  if (code === 45 || code === 48) return "cloudy";

  const rainCodes = [
    51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82, 95,
    96, 99,
  ];
  if (rainCodes.includes(code)) return "cloud-rain";

  const snowCodes = [71, 73, 75, 77, 85, 86];
  if (snowCodes.includes(code)) return "snowflake";

  return "cloudy";
}
