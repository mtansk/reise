"use client";

import { getLocationSuggestions } from "@/actions/locations";
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
  /*   const {
    query,
    setQuery,
    suggestions,
    setSuggestions,
    setLocation,
  } = useChatStartStore((state) => ({
    query: state.query,
    setQuery: state.setQuery,
    suggestions: state.suggestions,
    setSuggestions: state.setSuggestions,
    setLocation: state.setLocation,
  })); */

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
      try {
        const results = await getLocationSuggestions({
          query: value,
        });
        actions.setSuggestions(results || []);
      } catch (error) {
        actions.setSuggestions([]);
      }
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
        placeholder="Search..."
        value={query}
        onChange={handleInputChange}
        showTrigger={false}
        ref={inputRef}
      />
      <ComboboxContent>
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
