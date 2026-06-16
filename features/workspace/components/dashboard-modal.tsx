"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function DashboardModal({
  open,
  title,
  description,
  children,
  onClose,
  className,
}: {
  open: boolean;
  title: string;
  description?: string;
  children: React.ReactNode;
  onClose: () => void;
  className?: string;
}) {
  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center bg-[#0d0d0c]/55 p-4 sm:items-center sm:p-6">
      <button
        type="button"
        aria-label="Close modal"
        className="absolute inset-0"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="dashboard-modal-title"
        className={cn(
          "relative w-full max-w-xl border border-[#0d0d0c] bg-white shadow-[12px_12px_0_#0d0d0c]",
          className,
        )}
      >
        <div className="flex items-start justify-between gap-4 border-b border-[#0d0d0c]/12 px-5 py-4 sm:px-6">
          <div className="min-w-0">
            <h2
              id="dashboard-modal-title"
              className="text-xl font-semibold text-[#0d0d0c]"
            >
              {title}
            </h2>
            {description ? (
              <p className="mt-2 text-sm leading-6 text-[#0d0d0c]/62">
                {description}
              </p>
            ) : null}
          </div>
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            aria-label="Close modal"
            className="rounded-md border-[#0d0d0c]/12 bg-white hover:bg-[#fff7f1]"
            onClick={onClose}
          >
            <X className="size-4" />
          </Button>
        </div>
        <div className="px-5 py-5 sm:px-6">{children}</div>
      </div>
    </div>
  );
}
