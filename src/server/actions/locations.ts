"use server";
import "server-only";

import { actionClient } from "@/lib/safe-action";
import { z } from "zod";
import { getLocationSuggestions } from "../functions/locations";

export const getLocationSuggestionsAction = actionClient
  .inputSchema(
    z.object({
      query: z.string(),
    }),
  )
  .action(async ({ parsedInput }) => {
    const suggestions =
      await getLocationSuggestions(parsedInput);

    return suggestions;
  });
