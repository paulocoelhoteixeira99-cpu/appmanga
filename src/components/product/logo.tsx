import { cn } from "@/lib/utils/cn";
import LogoGradientSvg from "@/assets/logo-gradient.svg";
import Image from "next/image";

type LogoSize = "sm" | "md" | "lg";

interface LogoProps {
  className?: string;
  size?: LogoSize;
}

const sizeMap: Record<LogoSize, { width: number; height: number }> = {
  sm: { width: 100, height: 23 },
  md: { width: 140, height: 32 },
  lg: { width: 160, height: 37 },
};

function Logo({ className, size = "md" }: LogoProps) {
  const { width, height } = sizeMap[size];

  return (
    <Image
      src={LogoGradientSvg}
      alt="Manga"
      width={width}
      height={height}
      className={cn("select-none", className)}
      priority
    />
  );
}

export { Logo, type LogoProps };
