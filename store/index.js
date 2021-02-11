export const state = () => ({
  authenticated: false,
  user: {}
})

export const mutations = {
  setAuthenticated (state) {
    state.authenticated = true
  },
  setUser (state, user) {
    state.user = user
  }
}

export const getters = {}
export const actions = {}
