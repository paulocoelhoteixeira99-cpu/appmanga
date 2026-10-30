import { cn } from "@/lib/utils/cn";

type AvatarSize = "xs" | "sm" | "md" | "lg";
type AvatarShape = "circle" | "rounded";

interface AvatarProps {
  className?: string;
  size?: AvatarSize;
  shape?: AvatarShape;
  src?: string | null;
  alt?: string;
  initials?: string;
}

const sizeMap: Record<AvatarSize, { container: string; text: string }> = {
  xs: { container: "size-6", text: "text-[10px]" },
  sm: { container: "size-8", text: "text-xs" },
  md: { container: "size-10", text: "text-xs" },
  lg: { container: "size-12", text: "text-sm" },
};

function Avatar({
  className,
  size = "md",
  shape = "circle",
  src,
  alt = "",
  initials,
}: AvatarProps) {
  const { container, text } = sizeMap[size];

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center overflow-hidden bg-neutral-100",
        container,
        shape === "circle" && "rounded-full",
        shape === "rounded" && "rounded-lg",
        className
      )}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className="size-full object-cover"
        />
      ) : initials ? (
        <span
          className={cn(
            "font-semibold leading-[1.5] text-neutral-900 select-none",
            text
          )}
        >
          {initials}
        </span>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-[60%] text-neutral-400"
        >
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
      )}
    </div>
  );
}

export { Avatar, type AvatarProps };
