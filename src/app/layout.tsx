import type { Metadata, Viewport } from "next";
import { Inter, Comfortaa } from "next/font/google";
import "./globals.css";
import "@matsborges/manga-design-system/button.css";
import "@matsborges/manga-design-system/text-field.css";
import "@matsborges/manga-design-system/text-area.css";
import "@matsborges/manga-design-system/product.css";
import "@matsborges/manga-design-system/progress-bar.css";
import "@matsborges/manga-design-system/bottom-navigation.css";
import "@matsborges/manga-design-system/navigation-item.css";
import "@matsborges/manga-design-system/fab.css";
import "@matsborges/manga-design-system/card.css";
import "@matsborges/manga-design-system/empty-state.css";
import "@matsborges/manga-design-system/skeleton.css";
import "@matsborges/manga-design-system/spinner.css";
import "@matsborges/manga-design-system/checkbox.css";
import "@matsborges/manga-design-system/badge.css";
import "@matsborges/manga-design-system/divider.css";
import "@matsborges/manga-design-system/chip.css";

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
    <html lang="pt-BR" className={`${inter.variable} ${comfortaa.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
