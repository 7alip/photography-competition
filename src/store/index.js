import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth/slice'
import { localeSlice } from './locale/slice'
import { competitionSlice } from './competition/slice'

export default configureStore({
  reducer: {
    auth: authSlice.reducer,
    locale: localeSlice.reducer,
    competition: competitionSlice.reducer,
  },
})
