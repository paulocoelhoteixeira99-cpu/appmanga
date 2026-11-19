"use client";

import { usePathname } from "next/navigation";
import { BottomNavigation } from "@matsborges/manga-design-system/bottom-navigation";
import { FAB } from "@matsborges/manga-design-system/fab";
import { ProductIcon } from "@matsborges/manga-design-system/product";
import { AddIcon } from "@matsborges/manga-design-system/icons";
import type { BottomNavigationEntry } from "@matsborges/manga-design-system/bottom-navigation";

const NAV_ITEMS: BottomNavigationEntry[] = [
  {
    id: "home",
    label: "Home",
    icon: <ProductIcon name="home" className="w-6 h-6" />,
    href: "/home",
  },
  {
    id: "movimentacoes",
    label: "Financeiro",
    icon: <ProductIcon name="account-balance-wallet" className="w-6 h-6" />,
    href: "/movimentacoes",
  },
  {
    id: "categorias",
    label: "Categorias",
    icon: <ProductIcon name="restaurant" className="w-6 h-6" />,
    href: "/categorias",
  },
  {
    id: "metas",
    label: "Metas",
    icon: <ProductIcon name="savings" className="w-6 h-6" />,
    href: "/metas",
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
      <main className="flex-1 pb-20">{children}</main>

      <div className="fixed bottom-0 inset-x-0 z-40">
        <div className="relative">
          <div className="absolute -top-7 left-1/2 -translate-x-1/2 z-50">
            <FAB
              aria-label="Nova transacao"
              icon={<AddIcon />}
              onClick={() => {
                // TODO: abrir fluxo de nova transacao
              }}
            />
          </div>
          <BottomNavigation label="Navegacao principal" items={items} />
        </div>
      </div>
    </div>
  );
}
