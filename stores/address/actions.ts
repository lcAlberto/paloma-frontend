import {useRuntimeConfig} from "#imports";

const authUserCookie = useCookie("authUser");
const accessToken = useCookie("token");
const isAuthenticated = useCookie("isAuthenticated");

export const actions = {

  async fetchCountries() {
    const config = useRuntimeConfig();
    this.loading.fetchingCountries = true
    await $fetch(`${config.public.apiBase}/countries`, {
      method: 'GET',
    }).then((response) => {
      this.clearErrorMessage()
      this.countries = response.countries
    }).catch((error) => {
      if (error && error.data) {
        this.errors.fields = error.data.errors;
        this.errors.message = error.data.message
      } else {
        this.errors.message = 'Erro interno do servidor.'
      }
    }).finally(() => this.loading.fetchingCountries = false)
  },

  async fetchStates(country_id: string | number) {
    const config = useRuntimeConfig();
    this.loading.fetchingStates = true
    await $fetch(`${config.public.apiBase}/states/country/${country_id}`, {
      method: 'GET',
    }).then((response) => {
      this.clearErrorMessage()
      this.states = response.states
    }).catch((error) => {
      if (error && error.data) {
        this.errors.fields = error.data.errors;
        this.errors.message = error.data.message
      } else {
        this.errors.message = 'Erro interno do servidor.'
      }
    }).finally(() => this.loading.fetchingStates = false)
  },

  async fetchCities(state_id: string | number) {
    const config = useRuntimeConfig();
    this.loading.fetchingCities = true
    await $fetch(`${config.public.apiBase}/city/state/${state_id}`, {
      method: 'GET',
    }).then((response) => {
      this.clearErrorMessage()
      this.cities = response.cities
    }).catch((error) => {
      if (error && error.data) {
        this.errors.fields = error.data.errors;
        this.errors.message = error.data.message
      } else {
        this.errors.message = 'Erro interno do servidor.'
      }
    }).finally(() => this.loading.fetchingCities = false)
  },

  async fetchBrazilianZipCode(zipCode: string) {
    this.loading.fetchingZipCode = true
    await $fetch(`https://brasilapi.com.br/api/cep/v2/${zipCode}`, {
      method: 'GET',
    }).then((response) => {
      this.zipcodeData = {}
      this.clearErrorMessage()
      if (response && response.city) {
        this.zipcodeData = response;
      }
    }).catch((error) => {
      if (error && error.data) {
        this.errors.fields = error.data.errors;
        this.errors.message = error.data.message
      } else {
        this.errors.message = 'Erro interno do servidor.'
      }
    }).finally(() => this.loading.fetchingCities = false)
  },

  async createAddressFarm(params: object) {
    const config = useRuntimeConfig();
    this.loading.creatingFarmAddress = true

    await useAuthFetch(`${config.public.apiBase}/address`, {
      method: 'POST',
      params
    }).then((response) => {
      console.log(response.data.value);
      this.farmAddress = response.data.value.address
    }).catch((error) => {
      if (error && error.data) {
        this.errors.fields = error.data.errors;
        this.errors.message = error.data.message
      } else {
        this.errors.message = 'Erro interno do servidor.'
      }
    }).finally(() => this.loading.creatingFarmAddress = false)
  },

  clearErrorMessage() {
    this.errors.message = null
  },
}
