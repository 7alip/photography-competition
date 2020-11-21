import { createSlice } from '@reduxjs/toolkit'
import { competitionReducers } from './reducers'
import { competitionState } from './state'

export const competitionSlice = createSlice({
  name: 'competition',
  initialState: competitionState,
  reducers: competitionReducers,
})
