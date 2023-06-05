/* eslint-disable @next/next/no-img-element */
import BuyerSidebar from '@/components/BuyerSidebar'
import MainLayout from '@/layouts/MainLAyout'
import ModalWraper from '@/modals'
import OrderDetails from '@/modals/OrderDetails'
import { actionToggle } from '@/redux/reducer/modalReducer'
import { useTypedDispatch, useTypedSelector } from '@/redux/store'
import React, { ReactElement } from 'react'

type ICart = {
  id: number
  qty: string
  title: string
  subTotal: string
  product_img: string
  content: string
}

const RowDetails = ({
  qty,
  id,
  product_img,
  subTotal,
  title,
  content,
}: ICart) => {
  const dispatch = useTypedDispatch()
  const handleClick = (type: string, id: number) => {
    dispatch(actionToggle({ type, id }))
  }
  const {
    specificModal: modal,
    modalType,
    id: index,
  } = useTypedSelector((state) => state.modal)
  return (
    <>
      {modal && modalType === 'view_details' && index === id && (
        <ModalWraper>
          {' '}
          <OrderDetails />
        </ModalWraper>
      )}
      <div className="mb-2 w-full py-4 items-center border-[#CCCCCC]  border-b flex">
        <div className="basis-[52%] flex">
          <img
            src={product_img}
            alt="product_image"
            className="w-[120px] h-[120px] mr-4"
          />
          <div className="flex flex-col">
            <h1 className="font-poppins text-[16px] leading-[30px] font-semibold">
              {title}
            </h1>
            <span className="font-poppins w-[90%] text-[12px] lowercase leading-[21px]">
              {content}
            </span>
          </div>
        </div>
        <span className="font-semibold text-[14px] leading-[21px] font-poppins basis-[12%]">
          ${subTotal}
        </span>
        <div className="basis-[12%] flex">
          <span className="bg-[#EBEBEB] h-[60px] focus:outline-none text-center items-center justify-center flex font-semibold  py-[12px] rounded-[6px] w-[60px] border-none ">
            {qty}
          </span>
        </div>
        <div
          className="basis-[12%] cursor-pointer flex"
          onClick={() => handleClick('view_details', id)}
        >
          <span className="font-semibold underline text-bd-blue text-[14px] leading-[21px] font-poppins">
            view details
          </span>
        </div>
        <div className="basis-[12%] cursor-pointer flex">
          <span className="font-semibold underline text-bd-blue text-[14px] leading-[21px] font-poppins">
            Track Order
          </span>
        </div>
      </div>
    </>
  )
}

const Orders = () => {
  return (
    <BuyerSidebar header="Order Tracking">
      <div className="flex flex-col w-full">
        <h1 className="font-poppins text-[18px] leading-[36px] font-semibold pb-2 border-b border-[#CCCCCC]">
          Your Orders
        </h1>
        <div className="flex border-[#CCCCCC] py-5 border-b">
          <span className="font-semibold text-[14px] leading-[21px] font-poppins  basis-[52%]">
            Item
          </span>
          <span className="font-semibold text-[14px] leading-[21px] font-poppins basis-[12%]">
            Total Price
          </span>
          <span className="font-semibold text-[14px] leading-[21px] font-poppins basis-[12%]">
            Qty
          </span>
          <span className="font-semibold text-[14px] leading-[21px] font-poppins basis-[12%]">
            view Details
          </span>
          <span className="font-semibold text-[14px] leading-[21px] font-poppins basis-[12%]">
            Action
          </span>
        </div>
        <RowDetails
          id={1}
          qty="12"
          subTotal="8,311"
          title="Emuulsion Paint"
          content="MSI MEG Trident X 10SD-1012AU Intel i7 10700K, 2070 SUPER, 32GB RAM, 1TB SSD, Windows 10 Home, Gaming Keyboard and Mouse 3 Years Warranty"
          product_img="/assets/paint.png"
        />
        <RowDetails
          id={2}
          qty="5"
          subTotal="8,311"
          title="Emuulsion Paint"
          content="MSI MEG Trident X 10SD-1012AU Intel i7 10700K, 2070 SUPER, 32GB RAM, 1TB SSD, Windows 10 Home, Gaming Keyboard and Mouse 3 Years Warranty"
          product_img="/assets/paint.png"
        />
      </div>
    </BuyerSidebar>
  )
}

export default Orders

Orders.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>
}
