import { addBrowserCookie } from '@/hooks/useCookie'
import { IAuthToken } from '@/interface/form.interface'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

const initialState: IAuthToken = {
  token: null,
  loggedUser: null,
}

export const tokenSlice = createSlice({
  name: 'authToken',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<{ token: string }>) => {
      console.log(action.payload)
      addBrowserCookie(action.payload)
      state.token = action.payload.token
    },
    setUser: (state, action: PayloadAction<{ token: string }>) => {
      console.log(action, 'actionuser')
      state.loggedUser = action.payload.token
    },
  },
})

export const selectAuth = (state: RootState) => state.authToken.token

export const { setToken, setUser } = tokenSlice.actions
export const tokenReducer = tokenSlice.reducer
