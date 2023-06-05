import { closeModal } from '@/redux/reducer/modalReducer'
import { useTypedDispatch } from '@/redux/store'
import Button from '@/ui/button/Button'
import Image from 'next/image'
import React from 'react'

const OrderDetails = () => {
  const dispatch = useTypedDispatch()
  const closeDriverModal = () => {
    dispatch(closeModal())
  }
  return (
    <div className="w-full">
      <div className="flex  items-center w-full border-[#CCCCCC] border-b justify-between px-6 py-3 ">
        <h1 className="text-[#23262F] flex justify-between  items-center font-semibold font-poppins text-[20px] leading-[40px]">
          Order Details
        </h1>
        <i
          className="text-[16px] w-[30px] h-[30px] cursor-pointer rounded-[30px] text-[#363339] items-center justify-center flex bg-[#FFF2F2]  ri-close-line"
          onClick={closeDriverModal}
        ></i>
      </div>
      <div className="px-6 pb-10 pt-6 flex ">
        <Image
          src="/assets/paint.png"
          alt="order-image"
          width={200}
          height={200}
          className="w-[200px] mr-6 h-[200px]"
        />
        <div className="flex flex-col w-[400px]">
          <h1 className="text-[#23262F] flex justify-between  items-center font-semibold font-poppins text-[20px] leading-[36px]">
            Aluminium Paint
          </h1>
          <p className="lowercase text-[13px] w-[350px] py-2 font-poppins leading-[19px]">
            MSI CREATOR 17 A10SFS-240AU 17 UHD 4K HDR Thin Bezel Intel 10th Gen
            i7 10875H - RTX 2070 SUPER MAX Q - 16GB RAM - 1TB SSD NVME - Windows
            10 PRO Laptop
          </p>
          <span className="font-poppins pb-2 text-[14px] leading-[19px]">
            Amount: <b className="text-[16px]">$499.0</b>{' '}
          </span>
          <span className="font-poppins pb-2 text-[14px] leading-[19px]">
            Courier Number: <b className="text-[16px]">09087663552</b>{' '}
          </span>
          <Button
            type="outline"
            title="Track Order"
            classNames="w-[135px] border-bd-blue font-semibold px-6  py-2 text-[13px] mt-2  rounded-[20px]"
          />
        </div>
      </div>
    </div>
  )
}

export default OrderDetails
