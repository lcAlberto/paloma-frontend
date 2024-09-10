export const state = () => ({
  countries: ref([]),
  states: ref([]),
  cities: ref([]),
  zipcodeData: ref({}),
  farmAddress: ref({}),
  errors: {
    message: null,
    fields: ref([])
  },
  loading: {
    fetchingCountries: false,
    fetchingStates: false,
    fetchingCities: false,
    fetchingZipCode: false,
    creatingFarmAddress: false,
  },

  toast: <ToastType>{
    type: 'info',
    message: 'Message Content',
    config: {
      duration: 3000,
      position: 'tl'
    }
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

interface zipcodeType {
  cep: string,
  state: string,
  city: string,
  neighborhood: string,
  street: string,
  service: string,
  location: object
}