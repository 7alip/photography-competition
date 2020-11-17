export const authReducers = {
  login: (state, action) => {
    console.log('action', action)
    state.token = action.payload.token
    state.user = action.payload.user
    state.isLoggedIn = true
    state.isError = false
    state.isLoading = false
  },
  logout: state => {
    state.token = ''
    state.user = null
    state.isLoggedIn = false
  },
  loginFails: state => {
    state.isError = true
    state.isLoading = false
    state.isLoggedIn = false
  },
}
