export default {
  state: {
    error: null,
    loading: false
  },
  mutations: {
    setError (state, payload) { state.error = payload },
    clearError (state) { state.error = null },
    setLoading (state, payload) { state.loading = payload }
  },
  actions: {
    clearError ({ commit }) {
      commit('clearError')
    }
  },
  getters: {
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    }
  }
}
