"use server";

import { Location } from "@/generated/prisma/client";
import {
  getUnsplashQueryString,
  unsplash,
} from "@/lib/unsplash";

export async function getUnsplashPhotosForLocation({
  location,
}: {
  location: Location;
}) {
  const queryString = getUnsplashQueryString(location);

  const result = await unsplash.search.getPhotos({
    query: queryString,
    orientation: "landscape",
    perPage: 10,
    page: 1,
  });

  console.log(result);

  if (result.errors) {
    throw new Error(result.errors[0]);
  }

  /*   console.log(result.response.results); */

  return await result.response.results;
}
