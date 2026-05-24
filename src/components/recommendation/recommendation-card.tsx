import WeatherBlock from "@/components/recommendation/weather-block";
import { interTight } from "@/app/layout";
import clsx from "clsx";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Card, CardHeader, CardContent } from "../ui/card";
import { VibeBadge } from "../vibe/vibe-badge";
import { Button } from "../ui/button";
import {
  ArrowUpRight,
  Image as ImageIcon,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import { RecommendationWithLocation } from "@/server/functions/recommendations";
import LikeBlock from "./like-block";

export default function RecommendationCard({
  recommendation,
  latest,
}: {
  recommendation: RecommendationWithLocation;
  latest?: boolean;
}) {
  return (
    <Card className="relative h-min max-w-100 min-w-80">
      {latest && (
        <div
          className="absolute -top-24 left-0"
          id="latest"
        ></div>
      )}
      <CardHeader
        className={clsx(
          `font-medium`,
          interTight.className,
        )}
      >
        <h2 className="text-4xl">
          {`${recommendation?.destinationLocation.name}`}
        </h2>
        <p className="text-xl">
          {(
            recommendation?.destinationLocation.country !==
            recommendation?.sourceLocation.country
          ) ?
            `${recommendation?.destinationLocation.country}`
          : ""}
        </p>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-row flex-wrap gap-1">
          {recommendation?.vibe.map((v) => (
            <VibeBadge key={v} vibe={v} />
          ))}
        </div>
        <p>{recommendation?.vibeDescription}</p>
        <div className="flex flex-row gap-2">
          <Button variant={"outline"} size={"sm"} asChild>
            <Link
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${recommendation?.destinationLocation.name} ${recommendation?.destinationLocation.country}` || "")}`}
              target="_blank"
            >
              <MapPin />
              Open in Maps
              <ArrowUpRight />
            </Link>
          </Button>
          <Button variant={"outline"} size={"sm"} asChild>
            <Link
              href={`https://www.google.com/search?q=${encodeURIComponent(`${recommendation?.destinationLocation.name} ${recommendation?.destinationLocation.country} place` || "")}`}
              target="_blank"
            >
              <ImageIcon />
              Images
              <ArrowUpRight />
            </Link>
          </Button>
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-xs font-semibold">Weather</h3>
          <WeatherBlock
            location={recommendation!.destinationLocation}
          />
        </div>
        <Accordion type="multiple">
          <AccordionItem value="size">
            <AccordionTrigger>City Size</AccordionTrigger>
            <AccordionContent>
              {recommendation?.citySizeDescription}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="timing">
            <AccordionTrigger>Timing</AccordionTrigger>
            <AccordionContent>
              {recommendation?.timingDescription}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="tips">
            <AccordionTrigger>
              Practical Tips
            </AccordionTrigger>
            <AccordionContent>
              {recommendation?.practicalTips}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <LikeBlock recommendation={recommendation} />
      </CardContent>
    </Card>
  );
}
