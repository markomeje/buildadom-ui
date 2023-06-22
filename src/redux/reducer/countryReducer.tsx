/* eslint-disable @typescript-eslint/no-explicit-any */
import { Country, IProduct } from '@/interface/general.interface'
import { IPhone } from '@/ui/input/PhoneCountryCodeInput'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CountryState {
  country: Country
  birth_country: Country
  city: string
  state: string
  newProduct: IProduct
  countryCode: IPhone
  categoryId: string
}

export const initialState: CountryState = {
  country: {
    id: 0,
    name: '',
    iso2: '',
    capital: '',
  },
  birth_country: {
    id: 0,
    name: '',
    iso2: '',
    capital: '',
  },
  state: '',
  city: '',
  newProduct: {
    name: '',
    id: 0,
    img: '',
    rating: 0,
    reviews: '',
    description: '',
    price: '',
  },
  categoryId: '',
  countryCode: {
    dial_code: '',
    flag: '',
    code: '',
    name: '',
  },
}

export const CountrySlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setCountry: (state, action: PayloadAction<Country>) => {
      state.country = action.payload
    },
    setBirthCountry: (state, action: PayloadAction<Country>) => {
      state.birth_country = action.payload
    },

    setState: (state, action: PayloadAction<string>) => {
      console.log(action.payload, 'action payload')

      state.state = action.payload
    },
    setCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload
    },
    setAddedStepper: (state, action: PayloadAction<IProduct>) => {
      state.newProduct = action.payload
    },
    setCountryCode: (state, action: PayloadAction<IPhone>) => {
      state.countryCode = action.payload
    },
    setCategotyId: (state, action: PayloadAction<string>) => {
      state.categoryId = action.payload
    },
  },
})

export const {
  setCountry,
  setState,
  setBirthCountry,
  setCity,
  setAddedStepper,
  setCategotyId,
  setCountryCode,
} = CountrySlice.actions

export default CountrySlice.reducer
