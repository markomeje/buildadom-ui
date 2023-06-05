/* eslint-disable @next/next/no-img-element */
import React from 'react'

interface OrderListing {
  img: string
  content: string
  qty: string
  price: string
}

const OrderListing = ({ img, content, qty, price }: OrderListing) => {
  return (
    <div className="flex my-3">
      <img src={img} className="w-[75px] h-[75px] mr-4" alt="order_image" />
      <div className="flex flex-col">
        <span className="font-poppins text-[14px] pb-1 lowercase leading-[21px]">
          {content}
        </span>
        <div className="flex items-center">
          <span className="font-poppins mr-4 text-[#8C8C8C] text-[14px] leading-[21px]">
            Qty: <b className="text-black ml-2">{qty}</b>
          </span>
          <span className="font-poppins text-[#8C8C8C] text-[14px] leading-[21px]">
            Price:
            <b className="text-black ml-2">{price}</b>
          </span>
        </div>
      </div>
    </div>
  )
}

const DeliveryDetails = ({
  title,
  content,
}: {
  title: string
  content: string
}) => {
  return (
    <div className="flex my-3 flex-col">
      <p className="font-poppins text-[#828282] mb-2 font-[500] text-[14px] leading-[21px]">
        {title}
      </p>
      <h2 className="font-poppins text-[18px] leading-[20px]">{content}</h2>
    </div>
  )
}

const OrderSummary = () => {
  return (
    <div className="basis-[35%] flex flex-col">
      <div className="w-full mb-4 bg-[#F5F7FF] p-6">
        <h1 className="font-poppins text-[24px]  leading-[36px] font-semibold pb-2  mb-2 border-b border-[#CCCCCC]">
          Order Summary
        </h1>
        <p className="text-[14px] leading-[21px] pb-2 text-[#666666] font-poppins">
          2 items in cart
        </p>
        <div className="flex flex-col overflow-y-scroll h-[300px]">
          <OrderListing
            img="/assets/paint.png"
            content="MSI MEG Trident X 10SD-1012AU Intel i7 10700K, 2070 SUPER..."
            qty="1"
            price="$2300"
          />
          <OrderListing
            img="/assets/paint.png"
            content="MSI MEG Trident X 10SD-1012AU Intel i7 10700K, 2070 SUPER..."
            qty="1"
            price="$2300"
          />
          <OrderListing
            img="/assets/paint.png"
            content="MSI MEG Trident X 10SD-1012AU Intel i7 10700K, 2070 SUPER..."
            qty="1"
            price="$2300"
          />
          <OrderListing
            img="/assets/paint.png"
            content="MSI MEG Trident X 10SD-1012AU Intel i7 10700K, 2070 SUPER..."
            qty="1"
            price="$2300"
          />
        </div>
      </div>
      <div className="w-full bg-[#F5F7FF] p-6">
        <h1 className="font-poppins text-[24px]  leading-[36px] font-semibold pb-2  mb-2 border-b border-[#CCCCCC]">
          Delievery Details
        </h1>
        <p className="text-[14px] leading-[21px] pb-2 text-[#666666] font-poppins">
          2 items in cart
        </p>
        <div className="flex  flex-col">
          <DeliveryDetails
            title="Estimated delivery date"
            content="4th August - in 6days"
          />
          <DeliveryDetails title="Order number" content="NL2309443064" />
        </div>
      </div>
      <div className="w-full bg-[#F5F7FF] p-6">
        <h1 className="font-poppins text-[24px]  leading-[36px] font-semibold pb-2  mb-2 border-b border-[#CCCCCC]">
          Contact Number
        </h1>

        <div className="flex  flex-col">
          <DeliveryDetails title="Courier Number" content="09087663552" />
        </div>
      </div>
    </div>
  )
}

export default OrderSummary
