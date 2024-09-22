export const getters = {
  getLoading: (state) => {
    return (param) => state.loading[param]
  },

  getMothers: (state) => state.availableMothers,
  getFathers: (state) => state.availableFathers,
  getFlock: (state) => state.allFlock,
  getAnimal: (state) => state.animal,
  getCreatedAnimal: (state) => state.createdAnimal,

  getErrors: (state) => state.errors,
  getFormErrors: (state) => state.errors.fields,
  getErrorMessage: (state) => state.errors.message,
}