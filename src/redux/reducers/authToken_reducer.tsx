import { IAuthToken } from '@/interface/auth'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

const initialState: IAuthToken = {
  token: null,
}

export const tokenSlice = createSlice({
  name: 'authToken',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IAuthToken>) => {
      localStorage.setItem(
        'loggedInUser',
        JSON.stringify({
          token: action.payload.token,
        })
      )
      state.token = action.payload.token
    },
  },
})

export const selectAuth = (state: RootState) => state.authToken.token

export const { setUser } = tokenSlice.actions
export default tokenSlice.reducer
