export const getters = {
  getLoading: (state) => {
    return (param) => state.loading[param]
  },

  getCountries: (state) => state.countries,
  getStates: (state) => state.states,
  getCities: (state) => state.cities,
  getZipCodeData: (state) => state.zipcodeData,

  getFarmAddress: (state) => state.farmAddress,

  getErrors: (state) => state.errors,
  getFormErrors: (state) => state.errors.fields,
  getErrorMessage: (state) => state.errors.message,
}