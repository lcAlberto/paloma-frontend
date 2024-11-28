import {defineStore} from 'pinia'
import {useRuntimeConfig} from "#imports";
import useAuthFetch from "~/composables/useAuthFetch";

export const useFarmStore = defineStore('farmStore', () => {

  /* STATES */
  const farm = ref([])
  const errors = {
    message: '',
    fields: ref([])
  }
  const loading = {
    fetchingFarm: false,
    creatingFarm: false
  }

  const toast = <ToastType>{
    type: 'info',
    message: 'Message Content',
    config: {
      duration: 3000,
      position: 'tl'
    }
  }

  /* vars */

  const config = useRuntimeConfig();
  const router = useRouter()

  /* ACTIONS */
  async function createFarm(params: object) {
    try {
      loading.creatingFarm = true
      const response = await useAuthFetch(`/farms`, {
        method: 'POST',
        params
      })

      clearErrorMessage()
      farm.value = response.farm
    } catch (error) {
      if (error && error.data) {
        errors.fields = error.data.errors;
        errors.message = error.data.message
      } else {
        errors.message = 'Erro interno do servidor.'
      }
    } finally {
      loading.fetchingFarm = false
    }
  }

  async function fetchFarm(farm_id: string | number) {
    try {
      loading.fetchingFarm = true
      const response = await useAuthFetch(`/farms/${farm_id}`, {method: 'GET'})
      clearErrorMessage()
      farm.value = response
    } catch (error) {
      if (error && error.data) {
        errors.fields = error.data.errors;
        errors.message = error.data.message
      } else {
        errors.message = 'Erro interno do servidor.'
      }
    } finally {
      loading.fetchingFarm = false
    }
  }

  function clearErrorMessage() {
    errors.message = ''
  }

  return {
    farm,
    errors,
    loading,
    toast,
    createFarm,
    fetchFarm
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