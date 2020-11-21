import { authSlice } from './slice'

export const { login, loginFails, logout, isLoggedIn } = authSlice.actions

export const loginUser = payload => dispatch => {
  localStorage.setItem('user', JSON.stringify(payload.user))
  localStorage.setItem('token', JSON.stringify(payload.token))

  dispatch(login(payload))
}

export const logoutUser = () => dispatch => {
  localStorage.removeItem('user')
  localStorage.removeItem('token')

  dispatch(logout())
}
