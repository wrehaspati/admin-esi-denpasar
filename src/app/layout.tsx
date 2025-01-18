import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";
import { ThemeHandler } from "@/lib/theme-handler";

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
        className={`antialiased font-sans`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ThemeHandler />
          {children}
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
