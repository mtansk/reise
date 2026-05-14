import { getWeatherIconName } from "@/lib/utils";
import {
  Sun,
  Cloudy,
  CloudRain,
  Snowflake,
  LucideProps,
} from "lucide-react";

export default function WeatherIcon({
  code,
  className,
  ...props
}: {
  code: number;
  className?: string;
} & LucideProps) {
  const icons = {
    sun: Sun,
    cloudy: Cloudy,
    "cloud-rain": CloudRain,
    snowflake: Snowflake,
  };

  const iconName = getWeatherIconName({ code });
  const IconComponent = icons[iconName];
  return <IconComponent className={className} {...props} />;
}
