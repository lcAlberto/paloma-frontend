import {useRuntimeConfig} from "#imports";

export const actions = {

  async createFarm(params: object) {
    const config = useRuntimeConfig();
    const router = useRouter()

    this.loading.creatingFarm = true
    await useAuthFetch(`${config.public.apiBase}/farms`, {
      method: 'POST',
      params
    }).then((response) => {
      this.clearErrorMessage()
      this.farm = response.farm

      router.push('/home')

    }).catch((error) => {
      if (error && error.data) {
        this.errors.fields = error.data.errors;
        this.errors.message = error.data.message
      } else {
        this.errors.message = 'Erro interno do servidor.'
      }
    }).finally(() => this.loading.creatingFarm = false)
  },

  async fetchFarm(farm_id: string | number) {
    const config = useRuntimeConfig();
    this.loading.fetchingStates = true
    await useAuthFetch(`${config.public.apiBase}/farms`, {
      method: 'GET',
    }).then((response) => {
      this.clearErrorMessage()
      this.farm = response.farm
    }).catch((error) => {
      if (error && error.data) {
        this.errors.fields = error.data.errors;
        this.errors.message = error.data.message
      } else {
        this.errors.message = 'Erro interno do servidor.'
      }
    }).finally(() => this.loading.fetchingStates = false)
  },

  clearErrorMessage() {
    this.errors.message = null
  },
}
