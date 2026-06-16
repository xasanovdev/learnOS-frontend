"use client";

import { Search } from "lucide-react";

export function DashboardSearchField({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <label className="hidden min-w-0 items-center gap-3 border border-[#0d0d0c]/12 bg-white px-3 py-2 text-sm text-[#0d0d0c]/48 md:flex">
      <Search className="size-4" aria-hidden="true" />
      <span className="sr-only">{placeholder}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="min-w-0 flex-1 bg-transparent text-[#0d0d0c] outline-none placeholder:text-[#0d0d0c]/48"
      />
    </label>
  );
}
