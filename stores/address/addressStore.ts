import {defineStore} from 'pinia'
import {useRuntimeConfig} from "#imports";

export const useAddressStore = defineStore('addressStore', () => {
  const countries = ref([])
  const states = ref([])
  const cities = ref([])
  const zipcodeData = ref({})
  const farmAddress = ref({})
  const errors: { message: string | null, fields: Ref } = {
    message: null,
    fields: ref([])
  }
  const loading = {
    fetchingCountries: false,
    fetchingStates: false,
    fetchingCities: false,
    fetchingZipCode: false,
    creatingFarmAddress: false,
  }
  const toast = <ToastType>{
    type: 'info',
    message: 'Message Content',
    config: {
      duration: 3000,
      position: 'tl'
    }
  }

  const config = useRuntimeConfig();

  async function fetchCountries() {
    try {
      loading.fetchingCountries = true
      const response = await $fetch(`${config.public.apiBase}/countries`, {
        method: 'GET',
      })
      clearErrorMessage()
      countries.value = response.countries
    } catch (error) {
      if (error && error.data) {
        errors.fields = error.data.errors;
        errors.message = error.data.message
      }
      errors.message = 'Erro interno do servidor.'
    } finally {
      loading.fetchingCountries = false
    }
  }

  async function fetchStates(country_id: string | number) {
    try {
      loading.fetchingStates = true
      const response = await $fetch(`${config.public.apiBase}/states/country/${country_id}`, {
        method: 'GET',
      })
      clearErrorMessage()
      states.value = response.states
    } catch (error) {
      if (error && error.data) {
        errors.fields = error.data.errors;
        errors.message = error.data.message
      }
      errors.message = 'Erro interno do servidor.'
    } finally {
      loading.fetchingStates = false
    }
  }

  async function fetchCities(state_id: string | number) {
    try {
      loading.fetchingCities = true
      const response = await $fetch(`${config.public.apiBase}/city/state/${state_id}`, {
        method: 'GET',
      })

      clearErrorMessage()
      cities.value = response?.cities
    } catch (error) {
      if (error && error.data) {
        errors.fields = error.data.errors;
        errors.message = error.data.message
      } else {
        errors.message = 'Erro interno do servidor.'
      }
    } finally {
      loading.fetchingCities = false
    }
  }

  async function fetchBrazilianZipCode(zipCode: string) {
    try {
      loading.fetchingZipCode = true
      const response = await $fetch(`https://brasilapi.com.br/api/cep/v2/${zipCode}`, {
        method: 'GET',
      })
      zipcodeData.value = {}
      clearErrorMessage()
      if (response && response.city) {
        zipcodeData.value = response;
      }
    } catch (error) {
      if (error && error.data) {
        errors.fields = error.data.errors;
        errors.message = error.data.message
      } else {
        errors.message = 'Erro interno do servidor.'
      }
    } finally {
      loading.fetchingCities = false
    }
  }

  async function createAddressFarm(params: object) {
    try {
      loading.creatingFarmAddress = true

      const response = await useAuthFetch(`/address`, {
        method: 'POST',
        params
      })

      farmAddress.value = response.address
    } catch (error) {
      if (error && error.data) {
        errors.fields = error.data.errors;
        errors.message = error.data.message
      } else {
        errors.message = 'Erro interno do servidor.'
      }
    } finally {
      loading.creatingFarmAddress = false
    }
  }

  function clearErrorMessage() {
    errors.message = null
  }


  return {
    countries,
    states,
    cities,
    zipcodeData,
    farmAddress,
    errors,
    loading,
    toast,
    fetchCountries,
    fetchStates,
    fetchCities,
    fetchBrazilianZipCode,
    createAddressFarm
  }
})