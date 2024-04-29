import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppbarClient } from "~/appbar-client";

import { Providers } from "~/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CashX",
  description: "Handling your money with care.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body className={inter.className}>
          <AppbarClient />
          {children}
        </body>
      </Providers>
    </html>
  );
}
