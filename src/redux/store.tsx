/* eslint-disable @typescript-eslint/no-unused-vars */
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AnyAction, Reducer } from 'redux'
import { stepperReducer, stepperSlice } from './reducer/stepperReducer'
import { modalReducer, modalSlice } from './reducer/modalReducer'
import { HYDRATE, createWrapper, Context } from 'next-redux-wrapper'
import { authApi } from './services/auth.service'
import { tokenReducer, tokenSlice } from './reducer/tokenReducer'
import { validationApi } from './services/validation.service'
import countryReducer, { CountrySlice } from './reducer/countryReducer'
import { storeApi } from './services/merchant'
import { utilityApi } from './services/utility.slice'
import { generalApi } from './services/general.service'

const reducers = {
  [stepperSlice.name]: stepperReducer,
  [modalSlice.name]: modalReducer,
  [CountrySlice.name]: countryReducer,
  [tokenSlice.name]: tokenReducer,
  [authApi.reducerPath]: authApi.reducer,
  [validationApi.reducerPath]: validationApi.reducer,
  [storeApi.reducerPath]: storeApi.reducer,
  [utilityApi.reducerPath]: utilityApi.reducer,
  [generalApi.reducerPath]: generalApi.reducer,
}

const combinedReducer: Reducer = combineReducers<typeof reducers>(reducers)

export const rootReducer = (
  state: ReturnType<typeof combinedReducer>,
  action: AnyAction
) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    }
    return nextState
  } else {
    return combinedReducer(state, action)
  }
}

export const makeStore = (context: Context) =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat([
        authApi.middleware,
        validationApi.middleware,
        storeApi.middleware,
        utilityApi.middleware,
        generalApi.middleware,
      ]),
    devTools: true,
  })

type Store = ReturnType<typeof makeStore>
export type AppDispatch = Store['dispatch']
export type RootState = ReturnType<Store['getState']>
export const useTypedDispatch = () => useDispatch<AppDispatch>()
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
export const wrapper = createWrapper(makeStore, { debug: true })
