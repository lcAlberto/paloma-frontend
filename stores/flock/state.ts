export const state = () => ({
  availableMothers: ref([]),
  availableFathers: ref([]),
  createdAnimal: ref({}),
  allFlock: ref([]),
  animal: ref([]),

  errors: {
    message: null,
    fields: ref([])
  },
  loading: {
    fetchingMothers: false,
    fetchingFathers: false,

    fetchingAnimals: false,
    fetchingAnimal: false,
    creatingAnimal: false,
    deletingAnimal: false,
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
