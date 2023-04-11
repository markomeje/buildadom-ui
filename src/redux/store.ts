import { configureStore } from '@reduxjs/toolkit'
import {
  authTokenReudcer,
  dashboard_reducer,
  modalReducer,
  stepReducer,
} from './reducers'
import { authApi } from './reducers/auth_reducer'
import { validationApi } from './reducers/mechant_validation_reducer'
import { storeApi } from './reducers/strore_reducer'

export const store = configureStore({
  reducer: {
    modal: modalReducer.default,
    dashboard: dashboard_reducer.default,
    authToken: authTokenReudcer.default,
    step: stepReducer.default,
    [authApi.reducerPath]: authApi.reducer,
    [storeApi.reducerPath]: storeApi.reducer,
    [validationApi.reducerPath]: validationApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authApi.middleware,
      storeApi.middleware,
      validationApi.middleware,
    ]),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
