/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */

import { useAppDispatch, useAppSelector } from '@/hooks/useReducer'
import { closeModal } from '@/redux/reducers/modal_reducer'
import React, { useEffect, useRef } from 'react'

type Props = {
  children?: React.ReactNode
}

function ModalWraper({ children }: Props) {
  const { show } = useAppSelector((state) => state.modal)
  const dispatch = useAppDispatch()
  // close the modal when clicking outside the modal.
  const modalRef = useRef<HTMLElement>()
  const modalClose = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target === modalRef.current) {
      dispatch(closeModal())
    }
  }
  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [show])
  return (
    <div
      className={`container w-full`}
      ref={modalRef as React.RefObject<HTMLDivElement>}
      onClick={modalClose}
    >
      <main className="modal">{children}</main>
    </div>
  )
}

export default ModalWraper
