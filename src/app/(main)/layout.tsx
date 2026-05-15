import { AppSidebar } from "@/components/sidebar/app-sidebar";
import {
  SidebarProvider,
  SidebarInset,
} from "@/components/ui/sidebar";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getChatsByUserAction } from "@/server/actions/chats";
import { auth } from "@/lib/auth";
import { getFavoriteRecommendationsByUserAction } from "@/server/actions/recommendations";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  const queryClient = new QueryClient();
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["chats"],
      queryFn: async () => {
        return (await getChatsByUserAction()).data;
      },
    }),
    queryClient.prefetchQuery({
      queryKey: ["favorites"],
      queryFn: async () =>
        (await getFavoriteRecommendationsByUserAction())
          .data,
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
            {children}
          </div>
        </SidebarInset>
      </HydrationBoundary>
    </SidebarProvider>
  );
}
