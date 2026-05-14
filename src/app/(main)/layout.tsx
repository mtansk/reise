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
import { getChats } from "@/actions/chats";
import { auth } from "@/lib/auth";
import { getFavoriteRecommendationsByUser } from "@/actions/recommendations";

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
            {children}
          </div>
        </SidebarInset>
      </HydrationBoundary>
    </SidebarProvider>
  );
}
