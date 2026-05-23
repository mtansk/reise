import "server-only";

import type {
  Location,
  Prisma,
} from "@/generated/prisma/client";
import { PhotonResponseSchema } from "@/lib/zod/location";
import prisma from "../../../lib/prisma";

export async function getLocationSuggestions({
  query,
}: {
  query: string;
}) {
  if (query.length <= 2) return null;

  const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&lang=en&limit=5`;
  const res = await fetch(url, {
    signal: AbortSignal.timeout(3000),
  });
  const data = await res.json();

  const parsedData = PhotonResponseSchema.parse(data);
  const suggestions: Location[] = parsedData.features;
  return suggestions;
}

export async function upsertLocation({
  location,
  tx,
}: {
  location: Location;
  tx?: Prisma.TransactionClient;
}): Promise<Location> {
  const client = tx || prisma;

  return await client.location.upsert({
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
  const urlWithCountry = `https://photon.komoot.io/api/?q=${encodeURIComponent(`${city},${country}`)}&lang=en&limit=5`;
  const urlCityOnly = `https://photon.komoot.io/api/?q=${encodeURIComponent(city)}&lang=en&limit=5`;

  const [resWithCountry, resCityOnly] = await Promise.all([
    fetch(urlWithCountry)
      .then((res) => res.json())
      .catch(() => null),
    fetch(urlCityOnly)
      .then((res) => res.json())
      .catch(() => null),
  ]);

  if (resWithCountry) {
    const parsed =
      PhotonResponseSchema.safeParse(resWithCountry);
    if (parsed.success && parsed.data.features.length > 0) {
      const location: Location = parsed.data.features[0];
      return location;
    }
  }

  if (resCityOnly) {
    const parsed =
      PhotonResponseSchema.safeParse(resCityOnly);
    if (parsed.success && parsed.data.features.length > 0) {
      const location: Location = parsed.data.features[0];
      return location;
    }
  }

  throw new Error(
    `Photon API returned no results for city=${city}, country=${country}`,
  );
}
