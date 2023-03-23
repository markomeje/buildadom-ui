import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'

interface modalState {
  step: number
}

const initialState: modalState = {
  step: 1,
}

export const stepperSlice = createSlice({
  name: 'stepper',
  initialState,
  reducers: {
    setStepper: (state, action) => {
      state.step = action.payload
    },

    incrementStepper: (state) => {
      state.step = state.step + 1
    },
    decrementStepper: (state) => {
      state.step = state.step - 1
    },
  },
})

export const modalMode = (state: RootState) =>
  state && state.modal && state.modal

export const { incrementStepper, decrementStepper, setStepper } =
  stepperSlice.actions

export default stepperSlice.reducer
