import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

interface modalState {
  show: boolean
  modalType: string
  specificModal: boolean
  displayType: string
  id?: number
}

const initialState: modalState = {
  show: false,
  modalType: '',
  specificModal: false,
  displayType: 'grid',
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

    actionToggle: (
      state,
      action: PayloadAction<{ type: string; id: number }>
    ) => {
      ;(state.specificModal = !state.specificModal),
        (state.modalType = action.payload.type),
        (state.id = action.payload.id)
    },
    closeModal: (state) => {
      ;(state.show = false), (state.specificModal = false)
    },
    openModal: (state) => {
      state.show = true
    },
    setDisplayType: (state, action: PayloadAction<string>) => {
      state.displayType = action.payload
    },
  },
})

export const modalMode = (state: RootState) =>
  state && state.modal && state.modal

export const {
  toggle,
  closeModal,
  openModal,
  specificModal,
  actionToggle,
  setDisplayType,
} = modalSlice.actions

export const modalReducer = modalSlice.reducer
