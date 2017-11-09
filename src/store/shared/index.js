export default {
    state: {
        loading: false,
        authError: null
    },
    mutations: {
        setLoading(state, payload) {
            state.loading = payload
        },
        setAuthError(state, payload) {
            state.authError = payload
        },
        clearError(state) {
            state.authError = null
        }
    },
    actions: {
        clearError({ commit }) {
            commit('clearError')
        }
    },
    getters: {
        loading(state) {
            return state.loading
        },
        error(state) {
            return state.authError
        }
    }
}
