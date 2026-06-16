import { cn } from "@/lib/utils";

export function ShimmerBlock({
  className,
}: {
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "learnos-shimmer block bg-[#fff3ea]",
        className,
      )}
    />
  );
}
