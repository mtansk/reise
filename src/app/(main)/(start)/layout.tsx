import { Header } from "@/components/header";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="relative flex w-full grow flex-col items-center justify-center px-4">
        {children}
      </div>
    </>
  );
}
