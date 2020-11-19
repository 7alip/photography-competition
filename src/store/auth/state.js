const user = JSON.parse(localStorage.getItem('user'))
const token = JSON.parse(localStorage.getItem('token'))

export const authSate = {
  token: token || '',
  user: user || '',
  isLoading: false,
  isError: false,
}

export const getUser = state => state.auth.user
