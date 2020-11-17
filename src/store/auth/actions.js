import { authSlice } from './slice'

export const { login, loginFails, logout, isLoggedIn } = authSlice.actions

export const logoutAsync = () => dispatch => {
  setTimeout(() => {
    dispatch(logout)
  }, 1000)
}
