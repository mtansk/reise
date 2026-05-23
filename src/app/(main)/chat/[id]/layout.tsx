import { getChatByIdAction } from "@/server/actions/chats";
import { interTight } from "@/app/layout";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import clsx from "clsx";
import { Suspense } from "react";

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
      <header className="bg-background sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2">
        <div className="relative flex items-center gap-2">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2"
          />
          <h2
            className={clsx(
              interTight.className,
              "text-2xl",
            )}
          >
            {`From ${chat.sourceLocation.name}`}
          </h2>
        </div>
        <div className="h-full grow"></div>
      </header>
      {/*  <div className="relative py-2"></div> */}
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
