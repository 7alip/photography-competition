import { createSlice } from '@reduxjs/toolkit'
import { authReducers } from './reducers'
import { authSate } from './state'

export const authSlice = createSlice({
  name: 'auth',
  initialState: authSate,
  reducers: authReducers,
})
