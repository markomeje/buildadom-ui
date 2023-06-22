import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'

interface modalState {
  step: number
  info: object
  total: number
  shippingPrice: number
}

const initialState: modalState = {
  step: 1,
  info: {},
  total: 0,
  shippingPrice: 0,
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

    addInfo: (state, action) => {
      state.info = { ...state.info, ...action.payload }
    },

    incrementTotal: (state, action) => {
      console.log(action.payload, 'paload')
      state.total += action.payload
    },

    setShippingPrice: (state, action) => {
      state.shippingPrice = action.payload
    },

    decrementTotal: (state, action) => {
      state.total -= action.payload
    },
  },
})

export const modalMode = (state: RootState) =>
  state && state.modal && state.modal

export const {
  incrementStepper,
  decrementStepper,
  setStepper,
  addInfo,
  setShippingPrice,
  incrementTotal,
  decrementTotal,
} = stepperSlice.actions

export const stepperReducer = stepperSlice.reducer
