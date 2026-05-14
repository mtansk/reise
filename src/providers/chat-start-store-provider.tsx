"use client";

import {
  ChatStartStore,
  createChatStartStore,
} from "@/stores/chat-start-store";
import { useStore } from "zustand";
import { createContext, useContext, useState } from "react";

export type ChatStartStoreApi = ReturnType<
  typeof createChatStartStore
>;

const ChatStartStoreContext =
  createContext<ChatStartStoreApi | null>(null);

export const ChatStartStoreProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [store] = useState(createChatStartStore());
  return (
    <ChatStartStoreContext.Provider value={store}>
      {children}
    </ChatStartStoreContext.Provider>
  );
};

export const useChatStartStore = <T,>(
  selector: (store: ChatStartStore) => T,
): T => {
  const store = useContext(ChatStartStoreContext);
  if (!store) {
    throw new Error(
      "useChatStartStore must be used within a ChatStartStoreProvider",
    );
  }
  return useStore(store, selector);
};
