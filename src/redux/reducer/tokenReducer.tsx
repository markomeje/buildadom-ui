import { addBrowserCookie } from '@/hooks/useCookie'
import { IAuthToken } from '@/interface/form.interface'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { IUser } from '@/interface/auth'

const initialState: IAuthToken = {
  token: null,
  loggedUser: null,
  userDetails: null,
}

export const tokenSlice = createSlice({
  name: 'authToken',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<{ token: string }>) => {
      addBrowserCookie(action.payload)
      state.token = action.payload.token
    },
    setUser: (state, action: PayloadAction<{ token: string }>) => {
      state.loggedUser = action.payload.token
    },
    setUserDetails: (state, action: PayloadAction<IUser>) => {
      state.userDetails = action.payload
    },
  },
})

export const selectAuth = (state: RootState) => state.authToken.token

export const { setToken, setUser, setUserDetails } = tokenSlice.actions
export const tokenReducer = tokenSlice.reducer
