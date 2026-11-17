import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

interface SidebarProps extends HTMLAttributes<HTMLElement> {
  collapsed?: boolean;
}

function Sidebar({ collapsed = false, className, children, ...props }: SidebarProps) {
  return (
    <aside
      className={cn(
        "h-full bg-white border-r border-neutral-200 flex flex-col py-4 transition-[width] duration-200",
        collapsed ? "w-16 items-center px-2" : "w-60 px-3",
        className
      )}
      {...props}
    >
      {children}
    </aside>
  );
}

export { Sidebar, type SidebarProps };
