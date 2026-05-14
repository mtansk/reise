import type { Metadata } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import QueryClientProvider from "@/providers/query-client-provider";
import { SessionProvider } from "next-auth/react";
import { Suspense } from "react";
import { ChatStartStoreProvider } from "@/providers/chat-start-store-provider";

export const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const interTight = Inter_Tight({
  variable: "--font-sans-tight",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Trip AI",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("font-sans", inter.variable)}
    >
      <body
        className={`${inter.variable} font-sans antialiased`}
      >
        <SessionProvider>
          <QueryClientProvider>
            <TooltipProvider>
              <ChatStartStoreProvider>
                {/*     <Suspense fallback={<div>Loading...</div>}> */}
                {children}
                {/*      </Suspense> */}
              </ChatStartStoreProvider>
            </TooltipProvider>
          </QueryClientProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
