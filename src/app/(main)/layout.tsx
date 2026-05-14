import { AppSidebar } from "@/components/sidebar/app-sidebar";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getChats } from "@/actions/chats";
import { auth } from "@/lib/auth";
import { getFavoriteRecommendationsByUser } from "@/actions/recommendations";
import { Suspense } from "react";
import { Separator } from "@/components/ui/separator";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  /*   "use cache"; */
  const session = await auth();

  const queryClient = new QueryClient();
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["chats"],
      queryFn: () => getChats(session?.user?.id || "12"),
    }),
    queryClient.prefetchQuery({
      queryKey: ["favorites"],
      queryFn: () =>
        getFavoriteRecommendationsByUser(
          session?.user?.id || "12",
        ),
    }),
  ]);

  return (
    <SidebarProvider>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <AppSidebar
          /* chats={chats} */ user={session?.user}
        />

        <SidebarInset className="h-full overflow-hidden wrap-anywhere">
          <div className="no-scrollbar relative h-[calc(100vh-1rem)]! overflow-auto px-4">
            {/* <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2">
              <div className="relative flex items-center gap-2">
                <SidebarTrigger className="-ml-1" />
                <Separator
                  orientation="vertical"
                  className="mr-2"
                />
              </div>
              <div className="bg-background h-full grow"></div>
            </header> */}
            {children}
          </div>
        </SidebarInset>
      </HydrationBoundary>
    </SidebarProvider>
  );
}
