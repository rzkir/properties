export function getApiBaseUrl(): string {
  const { apiUrl } = useRuntimeConfig().public;
  return (apiUrl || "").replace(/\/+$/, "");
}

export function getApiSecret(): string {
  const { apiSecret } = useRuntimeConfig().public;
  return apiSecret || "";
}

export function buildApiUrl(pathname: string): string {
  const base = getApiBaseUrl();
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${base}${path}`;
}

export async function apiFetch<T>(
  pathname: string,
  options: Parameters<typeof $fetch<T>>[1] = {},
): Promise<T> {
  const apiSecret = getApiSecret();
  return await $fetch<T>(buildApiUrl(pathname), {
    credentials: "include",
    ...options,
    headers: {
      ...(apiSecret ? { "x-api-secret": apiSecret } : {}),
      ...(options as any)?.headers,
    },
  });
}

