import type {
  Location,
  Vibe,
} from "@/generated/prisma/client";
import { createStore } from "zustand/vanilla";

export type ChatStartStore = {
  query: string;
  suggestions: Location[];
  vibe: Set<Vibe>;
  location: Location | null;

  actions: {
    setQuery: (query: string) => void;
    setSuggestions: (suggestions: Location[]) => void;
    setVibe: (vibe: Set<Vibe>) => void;
    setLocation: (location: Location | null) => void;
  };
};

export const createChatStartStore = () => {
  return createStore<ChatStartStore>((set) => ({
    query: "",
    suggestions: [],
    vibe: new Set(),
    location: null,

    actions: {
      setQuery: (query: string) => set({ query }),
      setSuggestions: (suggestions: Location[]) =>
        set({ suggestions }),
      setVibe: (vibe: Set<Vibe>) => set({ vibe }),
      setLocation: (location: Location | null) =>
        set({ location }),
    },
  }));
};
