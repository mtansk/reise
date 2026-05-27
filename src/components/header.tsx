import { Separator } from "./ui/separator";
import { SidebarTrigger } from "./ui/sidebar";

export function Header({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <header className="bg-background sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 px-4">
      <div className="relative flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2"
        />
        {children}
      </div>
      <div className="h-full grow"></div>
    </header>
  );
}
