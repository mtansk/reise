import { AppSidebar } from "@/components/sidebar/app-sidebar";
import {
  SidebarProvider,
  SidebarInset,
} from "@/components/ui/sidebar";
import {
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { auth } from "@/lib/auth";
import {
  chatsQueryOptions,
  favoriteRecommendationsQueryOptions,
  makeQueryClient,
} from "@/lib/query-options";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  const queryClient = makeQueryClient();

  queryClient.prefetchQuery(chatsQueryOptions());
  queryClient.prefetchQuery(
    favoriteRecommendationsQueryOptions(),
  );

  return (
    <SidebarProvider>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <AppSidebar user={session?.user} />

        <SidebarInset className="h-full overflow-hidden wrap-anywhere">
          <div className="no-scrollbar relative flex h-[calc(100dvh-1rem)]! flex-col overflow-auto">
            {children}
          </div>
        </SidebarInset>
      </HydrationBoundary>
    </SidebarProvider>
  );
}
