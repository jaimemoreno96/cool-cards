import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cool Cards",
  description: "Cool Cards",
  icons: {
    icon: "/favicon.ico",
  }
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex flex-col w-full h-full">
          <SessionProvider>
            {children}
            <Toaster />
          </SessionProvider>
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
