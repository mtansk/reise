import { getChatByIdAction } from "@/server/actions/chats";
import { interTight } from "@/app/layout";
import clsx from "clsx";
import { Suspense } from "react";
import { Header } from "@/components/header";
import { Skeleton } from "@/components/ui/skeleton";

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

  return (
    <>
      <Header>
        <Suspense
          fallback={<Skeleton className="h-6 w-32" />}
        >
          <HeaderInset chatId={paramsData.id} />
        </Suspense>
      </Header>
      {children}
    </>
  );
}

async function HeaderInset({ chatId }: { chatId: string }) {
  const chatAction = await getChatByIdAction({
    chatId,
  });

  const chat = chatAction.data;

  return (
    <h2 className={clsx(interTight.className, "text-2xl")}>
      {chat ?
        `From ${chat.sourceLocation.name}`
      : "Not Found"}
    </h2>
  );
}
