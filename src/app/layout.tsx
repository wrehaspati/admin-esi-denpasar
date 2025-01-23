import type { Metadata } from "next";
import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";
import { ThemeHandler } from "@/lib/theme-handler";
import GARDevTeamNotch from "@/components/gardevteam-notch";
import { UserProvider } from "@/context/UserContext";

export const metadata: Metadata = {
  title: "ESI KOTA DENPASAR",
  description: "Esports Indonesia Tingkat Kota Denpasar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${GeistSans.className} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ThemeHandler />
          <UserProvider>
            {children}
          </UserProvider>
        </ThemeProvider>
        <Toaster />
        <GARDevTeamNotch/>
      </body>
    </html>
  );
}
