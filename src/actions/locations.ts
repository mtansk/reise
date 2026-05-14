"use server";

import type { Location } from "@/generated/prisma/client";
import { PhotonResponseSchema } from "@/lib/zod/location";
import prisma from "../../lib/prisma";

export async function getLocationSuggestions({
  query,
}: {
  query: string;
}) {
  if (query.length <= 2) return null;

  try {
    const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&lang=en&limit=5`;
    const res = await fetch(url);
    const data = await res.json();

    const parsedData = PhotonResponseSchema.parse(data);
    const suggestions: Location[] = parsedData.features;
    return suggestions;
  } catch (e) {}
}

export async function upsertLocation({
  location,
}: {
  location: Location;
}): Promise<Location> {
  return await prisma.location.upsert({
    where: {
      id: location.id,
    },
    update: {
      name: location.name,
      country: location.country,
      lat: location.lat,
      lng: location.lng,
    },
    create: {
      id: location.id,
      name: location.name,
      country: location.country,
      lat: location.lat,
      lng: location.lng,
    },
  });
}

export async function getPhotonLocationData({
  city,
  country,
}: {
  city: string;
  country: string;
}) {
  try {
    const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(`${city},${country}`)}&lang=en&limit=1`;
    const res = await fetch(url);
    const data = await res.json();

    const parsedData = PhotonResponseSchema.parse(data);
    const location: Location = parsedData.features[0];
    return location;
  } catch (e) {}
}
