export const getters = {
    getLoading: (state) => state.loading,
    getAuthUser: (state) => state.authUser,
    getIsAuthenticated: (state) => state.isAuthenticated,
    getErrors: (state) => state.errors,
    getFormErrors: (state) => state.errors.fields,
    getErrorMessage: (state) => state.errors.message,
}