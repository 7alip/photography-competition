export const authSate = {
  token: '',
  user: null,
  isLoggedIn: false,
  isLoading: false,
  isError: false,
}

export const getUser = state => state.auth.user
