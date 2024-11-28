import {useAuthStore} from "~/stores/auth/authStore";
import type {FetchError} from "~/types/fetch";

const authUserCookie = useCookie("authUser");

export const authUser = () => {
  const router = useRouter();

  try {
    const userCookie = authUserCookie.value

    if (userCookie.id) {
      return userCookie
    }
    return refreshUserToken()

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

async function refreshUserToken() {
  const store = useAuthStore();

  if (store.authUser.id)
    return store.authUser;

  await store.me()
}