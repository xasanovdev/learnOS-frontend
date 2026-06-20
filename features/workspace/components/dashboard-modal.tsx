"use client";

import { X } from "lucide-react";
import { useLayoutEffect, useRef } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
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
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const wasOpenRef = useRef(false);

  useLayoutEffect(() => {
    if (open && !wasOpenRef.current) {
      returnFocusRef.current = document.activeElement as HTMLElement | null;
    }

    wasOpenRef.current = open;
  }, [open]);

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) {
          onClose();
        }
      }}
    >
      <DialogContent
        onCloseAutoFocus={(event) => {
          event.preventDefault();
          returnFocusRef.current?.focus();
        }}
        className={cn(
          "max-w-xl border border-[#0d0d0c] bg-white shadow-[12px_12px_0_#0d0d0c]",
          className,
        )}
      >
        <div className="flex items-start justify-between gap-4 border-b border-[#0d0d0c]/12 px-5 py-4 sm:px-6">
          <div className="min-w-0">
            <DialogTitle className="text-xl font-semibold text-[#0d0d0c]">
              {title}
            </DialogTitle>
            <DialogDescription
              className={cn(
                description
                  ? "mt-2 text-sm leading-6 text-[#0d0d0c]/62"
                  : "sr-only",
              )}
            >
              {description ?? `Dialog for ${title}.`}
            </DialogDescription>
          </div>
          <DialogClose asChild>
            <Button
              type="button"
              variant="outline"
              size="icon-sm"
              aria-label="Close modal"
              className="rounded-md border-[#0d0d0c]/12 bg-white hover:bg-[#fff7f1]"
            >
              <X className="size-4" />
            </Button>
          </DialogClose>
        </div>
        <div className="px-5 py-5 sm:px-6">{children}</div>
      </DialogContent>
    </Dialog>
  );
}
