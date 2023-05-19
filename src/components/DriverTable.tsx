import ModalWraper from '@/modals'
import AddDriverModal from '@/modals/AddDriver'
import DeleteAction from '@/modals/DeleteAction'
import { actionToggle } from '@/redux/reducer/modalReducer'
import { useTypedDispatch, useTypedSelector } from '@/redux/store'
import React from 'react'

type IProps = {
  data: IDriver[]
}

type IDriver = {
  firstname: string
  lastname: string
  phone: string
  id?: number
}

const Driver = ({ firstname, lastname, phone, id }: IDriver) => {
  const dispatch = useTypedDispatch()
  const {
    specificModal: modal,
    modalType,
    id: index,
  } = useTypedSelector((state) => state.modal)

  const handleClick = (type: string, id: number) => {
    dispatch(actionToggle({ type, id }))
  }

  return (
    <>
      {modal && modalType === 'delete' && index === id && (
        <ModalWraper>
          {' '}
          <DeleteAction id={id as number} />{' '}
        </ModalWraper>
      )}
      {modal && modalType === 'edit' && index === id && (
        <ModalWraper>
          {' '}
          <AddDriverModal id={id} />{' '}
        </ModalWraper>
      )}
      <div className="flex items-center justify-between py-3 border-b border-[#CCCCCC] px-4">
        <div className="flex flex-col">
          <span className="font-poppins font-semibold text-[14px]">{`${firstname} ${lastname}`}</span>
          <span className="font-poppins text-[12px] text-gray-600">
            {phone}
          </span>
        </div>
        <div className="flex items-center">
          <button
            onClick={() => handleClick('edit', id as number)}
            className="w-[35px] h-[35px] mr-3 flex items-center justify-center hover:font-semibold  bg-blue-100  font-poppins text-bd-blue rounded-[35px]"
          >
            <i className="ri-edit-2-line text-[14px] "></i>
          </button>
          <button
            onClick={() => handleClick('delete', id as number)}
            className="w-[35px] h-[35px] mr-3 flex items-center justify-center hover:font-semibold  bg-red-100  font-poppins text-[#FF4438] rounded-[35px]"
          >
            <i className="ri-delete-bin-3-line text-[14px] "></i>
          </button>
        </div>
      </div>
    </>
  )
}

const DriverTable = ({ data }: IProps) => {
  return (
    <div className="flex flex-col">
      <div className="h-[39px] mb-3 px-6 flex items-center justify-between bg-[#F5F7FF]">
        <span className="font-poppins font-semibold leading-[16px] text-[14px]">
          Driver Details
        </span>
        <span className="font-poppins font-semibold leading-[16px] text-[14px]">
          Action
        </span>
      </div>
      {data &&
        data.map((detail, index) => {
          return (
            <Driver
              key={index}
              firstname={detail.firstname}
              lastname={detail.lastname}
              phone={detail.phone}
              id={detail.id}
            />
          )
        })}
    </div>
  )
}

export default DriverTable
