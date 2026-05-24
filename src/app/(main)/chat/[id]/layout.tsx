import { getChatByIdAction } from "@/server/actions/chats";
import { interTight } from "@/app/layout";
import clsx from "clsx";
import { Suspense } from "react";
import { Header } from "@/components/header";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{
    id: string;
  }>;
}) {
  const paramsData = await params;

  const chatAction = await getChatByIdAction({
    chatId: paramsData.id,
  });

  const chat = chatAction.data;

  if (!chat) return null;

  return (
    <>
      <Header>
        <h2
          className={clsx(interTight.className, "text-2xl")}
        >
          {`From ${chat.sourceLocation.name}`}
        </h2>
      </Header>
      <Suspense
        fallback={
          <div className="flex h-screen items-center justify-center">
            Loading...
          </div>
        }
      >
        {children}
      </Suspense>
    </>
  );
}
