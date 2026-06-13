import Image from "next/image";

import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
  priority?: boolean;
  variant?: "black" | "white";
};

export function BrandLogo({
  className,
  priority = false,
  variant = "black",
}: BrandLogoProps) {
  return (
    <Image
      src={variant === "white" ? "/logo-white.svg" : "/logo-black.svg"}
      alt="learnOS"
      width={2223}
      height={328}
      priority={priority}
      className={cn("h-auto object-contain", className)}
    />
  );
}
