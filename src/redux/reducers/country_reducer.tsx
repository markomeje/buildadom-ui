/* eslint-disable @typescript-eslint/no-explicit-any */
import { Country } from '@/interface/dashboard'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface DashboardState {
  country: Country
  city: string
}

const initialState: DashboardState = {
  country: {
    id: 0,
    name: '',
    iso2: '',
    capital: '',
  },
  city: '',
}

export const DashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setCountry: (state, action: PayloadAction<Country>) => {
      console.log(action.payload, 'payload')
      state.country = action.payload
    },
    setCity: (state, action: PayloadAction<any>) => {
      state.city = action.payload
    },
  },
})

export const { setCountry, setCity } = DashboardSlice.actions

export default DashboardSlice.reducer
