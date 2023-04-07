/* eslint-disable @typescript-eslint/no-explicit-any */
import { Country } from '@/interface/general.interface'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CountryState {
  country: Country
  city: string
}

const initialState: CountryState = {
  country: {
    id: 0,
    name: '',
    iso2: '',
    capital: '',
  },
  city: '',
}

export const CountrySlice = createSlice({
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

export const { setCountry, setCity } = CountrySlice.actions

export default CountrySlice.reducer
