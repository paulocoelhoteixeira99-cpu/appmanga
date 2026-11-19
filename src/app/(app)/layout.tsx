"use client";

import { usePathname } from "next/navigation";
import { BottomNavigation } from "@matsborges/manga-design-system/bottom-navigation";
import { FAB } from "@matsborges/manga-design-system/fab";
import { ProductIcon } from "@matsborges/manga-design-system/product";
import { AddIcon } from "@matsborges/manga-design-system/icons";
import type { BottomNavigationEntry } from "@matsborges/manga-design-system/bottom-navigation";

// Figma Home: Bottom Navigation — In\u00edcio, Metas, Transa\u00e7\u00f5es, Categorias
const NAV_ITEMS: BottomNavigationEntry[] = [
  {
    id: "home",
    label: "In\u00edcio",
    icon: <ProductIcon name="home" className="w-6 h-6" />,
    href: "/home",
  },
  {
    id: "metas",
    label: "Metas",
    icon: <ProductIcon name="savings" className="w-6 h-6" />,
    href: "/metas",
  },
  {
    id: "transacoes",
    label: "Transa\u00e7\u00f5es",
    icon: <ProductIcon name="account-balance-wallet" className="w-6 h-6" />,
    href: "/transacoes",
  },
  {
    id: "categorias",
    label: "Categorias",
    icon: <ProductIcon name="restaurant" className="w-6 h-6" />,
    href: "/categorias",
  },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const items = NAV_ITEMS.map((item) => ({
    ...item,
    active: pathname.startsWith(item.href!),
  }));

  return (
    <div className="min-h-screen bg-manga-background-default flex flex-col">
      <main className="flex-1">{children}</main>

      {/* Figma: FAB at right=16, above bottom nav */}
      <div className="fixed bottom-0 inset-x-0 z-40">
        <div className="relative">
          {/* FAB — Figma: 56x56, right=16px, 16px above nav */}
          <div
            className="absolute z-50"
            style={{ right: "16px", bottom: "80px" }}
          >
            <FAB
              aria-label="Nova transa\u00e7\u00e3o"
              icon={<AddIcon />}
              onClick={() => {
                // TODO: abrir fluxo de nova transacao
              }}
            />
          </div>
          <BottomNavigation label="Navega\u00e7\u00e3o principal" items={items} />
        </div>
      </div>
    </div>
  );
}
