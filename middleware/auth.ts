import {useCookie, useNuxtApp, navigateTo, defineNuxtRouteMiddleware} from '#imports';

export default defineNuxtRouteMiddleware(async (to, from) => {
    console.log('defineNuxtRouteMiddleware');
    const nuxtApp = useNuxtApp();
    const accessToken = useCookie("token");

    function isAuthenticated(): boolean {
        return !!accessToken.value;
    }

    if (!isAuthenticated()) {
        return nuxtApp.runWithContext(() => navigateTo('/'));
    }
});
