import type {UseFetchOptions} from 'nuxt/app';
import {useRuntimeConfig, useCookie, showError} from '#imports';

const useAuthFetch = (url: string | (() => string), options: UseFetchOptions<null> = {}) => {
  const config = useRuntimeConfig();

  const customFetch = $fetch.create({
    baseURL: config.public.apiBase,
    onRequest({options}) {
      const token = useCookie('token');
      if (token?.value) {
        // console.log('[fetch request] Authorization header created');
        options.headers = options.headers || {};
        options.headers.Authorization = `Bearer ${token.value}`;
      }
    },
    onResponse({response}) {
      // console.info('onResponse ', {
      //   endpoint: response.url,
      //   status: response?.status,
      // });
    },
    onResponseError({response}) {
      const statusMessage = response?.status === 401 ? 'Unauthorized' : 'Response failed';
      console.error('onResponseError ', {
        endpoint: response.url,
        status: response?.status,
        statusMessage,
      });
      if (response?.status === 401) {
        const router = useRouter()
        router.push('/')
      }
      throw showError({
        statusCode: response?.status,
        statusMessage,
        fatal: true,
      });
    },
  });

  return useFetch(url, {
    ...options,
    $fetch: customFetch,
  });
};

export default useAuthFetch;
