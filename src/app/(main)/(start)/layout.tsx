import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="bg-background sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2">
        <div className="relative flex items-center gap-2">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2"
          />
        </div>
        <div className="h-full grow"></div>
      </header>
      {children}
    </>
  );
}
