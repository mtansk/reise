import StartForm from "@/components/start/start-form";
import { ChatStartStoreProvider } from "@/providers/chat-start-store-provider";

export default async function Page() {
  return (
    <ChatStartStoreProvider>
      <StartForm />
    </ChatStartStoreProvider>
  );
}
