import {useRouter, useRuntimeConfig} from "#imports";

const authUserCookie = useCookie("authUser");
const accessToken = useCookie("token");
const isAuthenticated = useCookie("isAuthenticated");

export const actions = {

  async login(params: object) {
    console.log('login');
    const config = useRuntimeConfig();
    const router = useRouter();
    await $fetch(`${config.public.apiBase}/login`, {
      method: 'POST',
      body: params,
    }).then((response) => {
      this.clearErrorMessage()

      if (authUserCookie && response.user) {
        accessToken.value = response.token
        authUserCookie.value = response.user
        isAuthenticated.value = true
        router.push('/home')
      }
    }).catch((error) => {
      if (error && error.data) {
        this.errors.fields = error.data.errors;
        this.errors.message = error.data.message
      } else {
        this.errors.message = 'Erro interno do servidor.'
      }
    })
  },

  async register(params: object, useTerms: boolean) {
    console.log('registe');
    const config = useRuntimeConfig();
    const router = useRouter();
    if (!useTerms) {
      this.errors.message = 'Aceite os termos de uso para continuar'
      return
    }
    await $fetch(`${config.public.apiBase}/register`, {
      method: 'POST',
      body: params,
    }).then((response) => {
      this.clearErrorMessage()

      if (authUserCookie && response.user) {
        accessToken.value = response.token
        authUserCookie.value = response.user
        isAuthenticated.value = true
        router.replace({hash: "#create-farm"})
      }
    }).catch((error) => {
      if (error && error.data) {
        this.errors.fields = error.data.errors;
        this.errors.message = error.data.message
      } else {
        this.errors.message = 'Erro interno do servidor.'
      }
    })
  },


  async me() {
    await useAuthFetch('/me', {
      method: 'GET',
    }).then((response) => {
      console.log(response);
    })
  },

  async logout() {
    const router = useRouter();

    await useAuthFetch('/logout', {
      method: 'POST',
    }).then(() => {
      authUserCookie.value = null;
      accessToken.value = null;
      isAuthenticated.value = false
      router.push('/')
    })
  },

  clearErrorMessage() {
    this.errors.message = null
  },
}
