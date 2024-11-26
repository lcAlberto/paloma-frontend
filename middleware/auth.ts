import {useCookie, useNuxtApp, navigateTo, defineNuxtRouteMiddleware, useRouter} from '#imports';
import {useAuthStore} from "~/stores/auth/authStore";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const nuxtApp = useNuxtApp();
  const router = useRouter();
  const accessToken = useCookie("token");
  const authStore = useAuthStore();
  const guestRoutes = ['/', '/create-farm'];

  function isAuthenticated(): boolean {
    return !!accessToken.value;
  }

  function hasFarm(): boolean {
    return authStore.authUser && authStore.authUser?.farm_id;
  }

  if (isAuthenticated() && hasFarm()) {
    if (guestRoutes.includes(to.path)) {
      return nuxtApp.runWithContext(() => router.back());
    }
  }

  if (!isAuthenticated()) {
    if (!guestRoutes.includes(to.path)) {
      return nuxtApp.runWithContext(() => navigateTo('/'));
    }
  }

  if (isAuthenticated() && !hasFarm()) {
    if (to.path !== '/create-farm') {
      return nuxtApp.runWithContext(() => navigateTo('/create-farm'));
    }
  }
});
