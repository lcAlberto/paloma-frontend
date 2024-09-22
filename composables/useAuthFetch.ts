import {useCookie, useRouter, useRuntimeConfig} from '#imports';
import type {FetchError, FetchOptions, FetchResponse} from "~/types/fetch";

export default async function useAuthFetch<T = any>(endpoint: string, options: FetchOptions = {}): Promise<FetchResponse<T>> {
  const config = useRuntimeConfig();
  const token = useCookie('token');
  const router = useRouter();

  const url = `${config.public.apiBase}${endpoint}`;
  options.headers = {
    ...options.headers,
    Authorization: `Bearer ${token.value}`,
  };

  try {
    return await $fetch<FetchResponse<T>>(url, options);
  } catch (error: any) {
    if (error.response) {
      if (error.response.status === 401) {
        router.push('/');
      } else if (error.response.status === 422) {
        return Promise.reject(error.response._data as FetchError);
      }
    }
    return Promise.reject(error);
  }
}
