import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'

interface modalState {
  step: number
  info: object
}

const initialState: modalState = {
  step: 1,
  info: {},
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
      console.log(state.step, "srtatddd")
    },
    decrementStepper: (state) => {
      state.step = state.step - 1
    },

    addInfo: (state, action) => {
      state.info = { ...state.info, ...action.payload }
    },
  },
})

export const modalMode = (state: RootState) =>
  state && state.modal && state.modal

export const { incrementStepper, decrementStepper, setStepper, addInfo } =
  stepperSlice.actions

export const stepperReducer = stepperSlice.reducer
