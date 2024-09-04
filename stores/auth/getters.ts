export const getters = {
    getLoading: (state) => state.loading,
    getAuthUser: (state) => state.authUser.data,
    getErrors: (state) => state.errors,
}