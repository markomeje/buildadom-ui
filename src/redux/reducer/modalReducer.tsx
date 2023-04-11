import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

interface modalState {
  show: boolean
  modalType: string
  specificModal: boolean
}

const initialState: modalState = {
  show: false,
  modalType: '',
  specificModal: false,
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    toggle: (state, action: PayloadAction<string>) => {
      ;(state.show = !state.show), (state.modalType = action.payload)
    },

    specificModal: (state, action: PayloadAction<string>) => {
      ;(state.specificModal = !state.specificModal),
        (state.modalType = action.payload)
    },

    closeModal: (state) => {
      ;(state.show = false), (state.specificModal = false)
    },
    openModal: (state) => {
      state.show = true
    },
  },
})

export const modalMode = (state: RootState) =>
  state && state.modal && state.modal

export const { toggle, closeModal, openModal, specificModal } =
  modalSlice.actions

export const modalReducer = modalSlice.reducer
