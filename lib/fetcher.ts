const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export class UnauthenticatedError extends Error {
  constructor() {
    super("Unauthenticated");
    this.name = "UnauthenticatedError";
  }
}

async function attempt(input: string, init?: RequestInit): Promise<Response> {
  return fetch(`${API_URL}${input}`, {
    ...init,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });
}

export async function fetcher<T>(path: string, init?: RequestInit): Promise<T> {
  let res = await attempt(path, init);

  if (res.status === 401) {
    const refreshRes = await attempt("/auth/refresh", { method: "POST" });

    if (!refreshRes.ok) {
      throw new UnauthenticatedError();
    }

    res = await attempt(path, init);
  }

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }

  return res.json() as Promise<T>;
}
