import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

interface NavItemProps extends HTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  collapsed?: boolean;
  disabled?: boolean;
}

function NavItem({ icon, label, active = false, collapsed = false, disabled, className, onClick, ...props }: NavItemProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "flex items-center rounded-lg transition-colors select-none",
        "focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 outline-none",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        collapsed ? "justify-center size-11" : "gap-3 px-3 h-11 w-full text-sm",
        active
          ? "bg-primary-50 text-primary-800 font-semibold"
          : "text-neutral-600 font-medium hover:bg-neutral-200 hover:text-neutral-900",
        className
      )}
      title={collapsed ? label : undefined}
      {...props}
    >
      <span className="shrink-0 size-5 flex items-center justify-center">{icon}</span>
      {!collapsed && <span className="truncate">{label}</span>}
    </button>
  );
}

interface NavItemMobileProps extends HTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  disabled?: boolean;
}

function NavItemMobile({ icon, label, active = false, disabled, className, onClick, ...props }: NavItemMobileProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center gap-1 py-2 min-w-[80px] transition-colors select-none",
        "focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 outline-none",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      {...props}
    >
      <span className={cn(
        "flex items-center justify-center w-12 h-7 rounded-full transition-colors",
        active ? "bg-primary-50" : ""
      )}>
        <span className={cn(
          "size-6 flex items-center justify-center",
          active ? "text-primary-800" : "text-neutral-600"
        )}>
          {icon}
        </span>
      </span>
      <span className={cn(
        "text-xs font-semibold leading-[1.5]",
        active ? "text-primary-800" : "text-neutral-600"
      )}>
        {label}
      </span>
    </button>
  );
}

export { NavItem, NavItemMobile, type NavItemProps, type NavItemMobileProps };
