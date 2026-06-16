"use client";

import useSWR from "swr";

import type { MeResponse, User } from "@/features/auth/types/auth.types";
import { fetcher, UnauthenticatedError } from "@/lib/api/fetcher";

export type { User };

export function useAuth() {
  const { data, error, isLoading, mutate } = useSWR<MeResponse>(
    "/auth/me",
    fetcher,
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
    },
  );

  const isUnauthenticated = error instanceof UnauthenticatedError;

  return {
    user: data?.user ?? null,
    isLoading,
    isAuthenticated: !!data?.user,
    isUnauthenticated,
    error,
    mutate,
  };
}
