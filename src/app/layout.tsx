import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

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
    <html lang="en">
      <body
        className={`antialiased font-sans`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
