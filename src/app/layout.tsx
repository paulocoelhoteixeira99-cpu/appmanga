import type { Metadata, Viewport } from "next";
import { Inter, Comfortaa } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
  variable: "--font-sans",
});

const comfortaa = Comfortaa({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-brand",
});

export const metadata: Metadata = {
  title: "Manga - Seu parceiro financeiro",
  description:
    "Controle suas financas de forma simples e inteligente. O Manga transforma dados em orientacao real.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Manga",
  },
};

export const viewport: Viewport = {
  themeColor: "#F07020",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={cn(inter.variable, comfortaa.variable)}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
