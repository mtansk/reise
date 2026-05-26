"use client";

import { getLocationSuggestionsAction } from "@/server/actions/locations";
import { useChatStartStore } from "@/providers/chat-start-store-provider";
import { useDebouncedCallback } from "use-debounce";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "../ui/combobox";
import {
  Item,
  ItemContent,
  ItemTitle,
  ItemDescription,
} from "../ui/item";
import type { Location } from "@/generated/prisma/client";
import { useRef } from "react";

export default function StartCombobox() {
  const query = useChatStartStore((state) => state.query);
  const suggestions = useChatStartStore(
    (state) => state.suggestions,
  );
  const actions = useChatStartStore(
    (state) => state.actions,
  );

  const inputRef = useRef<HTMLInputElement>(null);

  const debouncedGetSuggestions = useDebouncedCallback(
    async (value: string) => {
      const results = (
        await getLocationSuggestionsAction({
          query: value,
        })
      ).data;
      actions.setSuggestions(results || []);
    },
    500,
    {
      maxWait: 1000,
    },
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value;
    actions.setQuery(value);

    if (value.length >= 3) {
      debouncedGetSuggestions(value);
    } else {
      actions.setSuggestions([]);
      debouncedGetSuggestions.cancel();
    }
  };

  const handleSelection = (location: Location | null) => {
    if (!location) return;
    const selected = suggestions.find(
      (s) => s.id === location.id,
    );
    if (selected) {
      actions.setLocation(selected);
      actions.setQuery(
        `${selected.name}, ${selected.country}`,
      );
      actions.setSuggestions([selected]);
      inputRef.current?.blur();
    }
  };

  return (
    <Combobox
      filteredItems={suggestions}
      itemToStringValue={(s: Location) => s.id}
      onValueChange={handleSelection}
    >
      <ComboboxInput
        placeholder="Type..."
        value={query}
        onChange={handleInputChange}
        showTrigger={false}
        showClear={false}
        ref={inputRef}
        style={{
          fontSize: "1.5rem", // 48px
          lineHeight: "1",
          padding: "-2rem 0",
        }}
        className={
          "w-9/10 max-w-120 rounded-4xl px-10 py-6 transition-all duration-300 focus-within:border-blue-400/50! focus-within:ring-4! focus-within:ring-blue-500/20!"
        }
      ></ComboboxInput>
      <ComboboxContent
        className={"mt-4 rounded-2xl"}
        anchor={inputRef}
      >
        <ComboboxEmpty>Type to search...</ComboboxEmpty>
        <ComboboxList>
          {suggestions.map((suggestion) => (
            <ComboboxItem
              key={suggestion.id}
              value={suggestion}
            >
              <Item size="xs" className="p-0">
                <ItemContent>
                  <ItemTitle className="whitespace-nowrap">
                    {suggestion.name}
                  </ItemTitle>
                  <ItemDescription>
                    {suggestion.country}
                  </ItemDescription>
                </ItemContent>
              </Item>
            </ComboboxItem>
          ))}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
