export class UnauthenticatedError extends Error {
  constructor() {
    super("Unauthenticated");
    this.name = "UnauthenticatedError";
  }
}

async function attempt(input: string, init?: RequestInit): Promise<Response> {
  return fetch(input, {
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

  if (res.status === 204) {
    return undefined as T;
  }

  const text = await res.text();

  if (!text) {
    return undefined as T;
  }

  return JSON.parse(text) as T;
}
