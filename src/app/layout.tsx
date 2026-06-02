import type { Metadata } from "next";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import QueryClientProvider from "@/providers/query-client-provider";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
import { inter } from "./fonts";

export const metadata: Metadata = {
  title: "Reise.",
  description:
    "AI-powered app for finding one-day trip destinations based on your vibe.",
  keywords: [
    "one-day trips",
    "travel",
    "destinations",
    "AI",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("font-sans", inter.className)}
    >
      <body
        className={`${inter.className} font-sans antialiased`}
      >
        <SessionProvider>
          <QueryClientProvider>
            <TooltipProvider>{children}</TooltipProvider>
          </QueryClientProvider>
        </SessionProvider>
        <Toaster />
      </body>
    </html>
  );
}
