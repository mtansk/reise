import StartForm from "@/components/start/start-form";
import { HelloBlock } from "@/components/start/hello-block";
import { auth } from "@/lib/auth";
import { ChatStartStoreProvider } from "@/providers/chat-start-store-provider";

export default async function Page() {
  const session = await auth();

  if (!session?.user) {
    return <HelloBlock />;
  }

  return (
    <ChatStartStoreProvider>
      <StartForm />
    </ChatStartStoreProvider>
  );
}
