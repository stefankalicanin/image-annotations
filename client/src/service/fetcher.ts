import { config } from '../config/config';

export async function fetcher<TResponse>(url: string, options?: RequestInit): Promise<TResponse> {
  const headers: HeadersInit = {};

  if (!(options?.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  const response = await fetch(`${config.baseUrl}${url}`, {
    ...options,
    headers: {
      ...headers,
      ...(options?.headers || {}),
    },
  });

  if (!response.ok) {
    const errorBody = await response.json();
    throw new Error(errorBody.detail || 'An unexpected error occurred.');
  }

  return response.json();
}
