import { createSlice } from '@reduxjs/toolkit'
import { localeReducers } from './reducers'
import { localeState } from './state'

export const localeSlice = createSlice({
  name: 'locale',
  initialState: localeState,
  reducers: localeReducers,
})
