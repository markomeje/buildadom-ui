/* eslint-disable @typescript-eslint/no-explicit-any */
import { Country, IProduct } from '@/interface/general.interface'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CountryState {
  country: Country
  city: string
  newProduct: IProduct
}

const initialState: CountryState = {
  country: {
    id: 0,
    name: '',
    iso2: '',
    capital: '',
  },
  city: '',
  newProduct: {
    id: 0,
    img: '',
    rating: 0,
    reviews: '',
    description: '',
    price: '',
  },
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
    setAddedStepper: (state, action: PayloadAction<IProduct>) => {
      state.newProduct = action.payload
    },
  },
})

export const { setCountry, setCity, setAddedStepper } = CountrySlice.actions

export default CountrySlice.reducer
