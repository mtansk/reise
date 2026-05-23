import { getWeatherForLocationAction } from "@/server/actions/weather";
import { Skeleton } from "@/components/ui/skeleton";
import WeatherIcon from "@/components/weather-icon";
import { Location } from "@/generated/prisma/client";
import { cn } from "@/lib/utils";
import { ServerCrash } from "lucide-react";
import { Suspense } from "react";

const weatherBlockSize = "w-full h-14";

export default async function WeatherBlock({
  location,
}: {
  location: Location;
}) {
  return (
    <Suspense fallback={<WeatherSkeleton />}>
      <WeatherMain location={location} />
    </Suspense>
  );
}

async function WeatherMain({
  location,
}: {
  location: Location;
}) {
  /*   const weather = (
    await getWeatherForLocationAction({
      lat: location.lat,
      lng: location.lng,
    })
  ).data;

  if (!weather) { */
  return (
    <div
      className={cn(
        weatherBlockSize,
        "flex items-center justify-center gap-2 text-gray-500",
      )}
    >
      <ServerCrash className="" />
      Weather data unavailable
    </div>
  );
  /*   } */

  return (
    <div
      className={cn(
        weatherBlockSize,
        "flex flex-row justify-between",
      )}
    >
      {weather.daily.time.map((date, index) => (
        <OneDayBlock
          key={date}
          date={date}
          maxTemp={weather.daily.temperature_2m_max[index]}
          weatherCode={weather.daily.weather_code[index]}
        />
      ))}
    </div>
  );
}

function WeatherSkeleton() {
  return (
    <Skeleton
      className={cn(weatherBlockSize, "rounded-xl")}
    />
  );
}

function OneDayBlock({
  date,
  maxTemp,
  weatherCode,
}: {
  date: string;
  maxTemp: number;
  weatherCode: number;
}) {
  const _date = `${date.split("-")[2]}.${date.split("-")[1]}`;

  return (
    <div className="relative flex flex-col items-center gap-0.5">
      <div className="text-xs">{_date}</div>
      <div>
        <WeatherIcon
          code={weatherCode}
          className="size-6 font-light text-gray-700"
          strokeWidth={1.5}
        />
      </div>
      <div className="text-xs font-medium">
        {Math.round(maxTemp)}°
      </div>
    </div>
  );
}
