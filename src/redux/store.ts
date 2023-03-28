import { configureStore } from '@reduxjs/toolkit'
import { modalReducer, stepReducer } from './reducers'
import { authApi } from './reducers/auth_reducer'

export const store = configureStore({
  reducer: {
    modal: modalReducer.default,
    step: stepReducer.default,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
