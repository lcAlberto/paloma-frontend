import {defineStore} from 'pinia'
import {useRouter, useRuntimeConfig} from "#imports";

export const useAuthStore = defineStore('authStore', () => {
  /* STATES */
  const authUser = ref({})
  const errors = {
    message: null,
    fields: ref([])
  }
  const loading = {
    login: false,
    register: false,
    me: false,
    logout: false
  }

  const toast = ref<ToastType>({
    type: 'info',
    message: 'Message Content',
    config: {
      duration: 3000,
      position: 'tl'
    }
  })

  /* vars */
  const authUserCookie = useCookie("authUser");
  const accessToken = useCookie("token");
  const isAuthenticated = useCookie("isAuthenticated");

  const config = useRuntimeConfig();
  const router = useRouter();

  async function login(params: object) {
    try {
      loading.login = true;
      const response = await $fetch(`${config.public.apiBase}/login`, {
        method: 'POST',
        body: params,
      })
      clearErrorMessage()

      if (authUserCookie && response.user) {
        accessToken.value = response.token
        authUserCookie.value = response.user
        authUser.value = response.user
        isAuthenticated.value = true
        router.push('/home')
      }
    } catch (error) {
      if (error && error.data) {
        errors.fields = error.data.errors;
        errors.message = error.data.message
      } else {
        errors.message = 'Erro interno do servidor.'
      }
    } finally {
      loading.login = false;
    }
  }

  async function register(params: object, useTerms: boolean) {
    try {
      loading.register = true;
      if (!useTerms) {
        errors.message = 'Aceite os termos de uso para continuar'
        return
      }

      const response = await $fetch(`${config.public.apiBase}/register`, {
        method: 'POST',
        body: params,
      })

      clearErrorMessage()

      if (authUserCookie && response.user) {
        accessToken.value = response.token
        authUserCookie.value = response.user
        authUser.value = response.user
        isAuthenticated.value = true
        router.push('/create-farm')
      }
    } catch (error) {
      if (error && error.data) {
        errors.fields = error.data.errors;
        errors.message = error.data.message
      } else {
        errors.message = 'Erro interno do servidor.'
      }
    } finally {
      loading.register = false;
    }
  }

  async function me() {
    loading.me = true;
    try {
      const response = await useAuthFetch('/me', {
        method: 'GET',
      })
      authUser.value = response
      authUserCookie.value = response
    } catch (e) {
      if (error && error.data) {
        errors.fields = error.data.errors;
        errors.message = error.data.message
      } else {
        errors.message = 'Erro interno do servidor.'
      }
    } finally {
      loading.me = false;
    }
  }

  async function logout() {
    try {
      loading.logout = true;
      const response = await useAuthFetch('/logout', {
        method: 'POST',
      })
      authUserCookie.value = null;
      accessToken.value = null;
      isAuthenticated.value = false
      router.push('/')
    } catch (error) {
      if (error && error.data) {
        errors.fields = error.data.errors;
        errors.message = error.data.message
      } else {
        errors.message = 'Erro interno do servidor.'
      }
    } finally {
      loading.logout = false;
    }
  }

  function clearErrorMessage() {
    errors.message = null
  }

  return {
    authUser,
    errors,
    loading,
    toast,
    login,
    logout,
    register,
    me,
    clearErrorMessage
  }
})

interface ToastType {
  type: string,
  message: string,
  config: ConfigType,
}

interface ConfigType {
  duration: number
  position: string
}