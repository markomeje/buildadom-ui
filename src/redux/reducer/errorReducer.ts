import { createSlice } from '@reduxjs/toolkit'

interface IError {
  validationErrors: object
}

const initialState: IError = {
  validationErrors: {},
}

export const errorSlice = createSlice({
  name: 'validationError',
  initialState,
  reducers: {
    setValidationErrors: (state, action) => {
      state.validationErrors = action.payload
    },
  },
})

export const { setValidationErrors } = errorSlice.actions
export const errorReducer = errorSlice.reducer
