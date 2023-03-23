import { configureStore } from '@reduxjs/toolkit'
import { modalReducer, stepReducer } from './reducers'

export const store = configureStore({
  reducer: {
    modal: modalReducer.default,
    step: stepReducer.default,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
