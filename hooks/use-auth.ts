import { fetcher, UnauthenticatedError } from "@/lib/fetcher";
import useSWR from "swr";

export type User = {
  id: string;
  email: string | null;
  name: string | null;
  externalId: string;
  username: string | null;
  firstName: string | null;
  lastName: string | null;
  photoUrl: string | null;
  phone: string | null;
  languageCode: "en" | "uz" | null;
};

type MeResponse = {
  user: User;
};

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
