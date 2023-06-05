/* eslint-disable @next/next/no-img-element */
import React, { ChangeEvent, useState } from 'react'

type ICart = {
  price: string
  title: string
  subTotal: string
  product_img: string
  content: string
}

const RowDetails = ({
  price,
  product_img,
  subTotal,
  title,
  content,
}: ICart) => {
  const [input, setInput] = useState('1')
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setInput(e.target.value)
  }

  return (
    <div className="mb-2 w-full py-4  border-[#CCCCCC]  border-b flex">
      <div className="basis-[54%] flex">
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
      <span className="font-semibold text-[14px] leading-[21px] font-poppins basis-[13%]">
        ${price}
      </span>
      <div className="basis-[15%] flex">
        <input
          value={input}
          onChange={handleChange}
          className="bg-[#EBEBEB] h-[60px] focus:outline-none text-center items-center justify-center flex font-semibold  py-[12px] rounded-[6px] w-[60px] border-none "
          type="number"
        />
      </div>
      <div className="basis-[18%] flex">
        <span className="font-semibold text-[14px] leading-[21px] font-poppins">
          ${subTotal}
        </span>
        <i className="ri-close-circle-line ml-8"></i>
      </div>
    </div>
  )
}

const CartDetails = () => {
  return (
    <div className="basis-[65%] mr-12">
      <div className="flex flex-col">
        <div className="flex border-[#CCCCCC] pb-2 border-b">
          <span className="font-semibold text-[14px] leading-[21px] font-poppins  basis-[54%]">
            Item
          </span>
          <span className="font-semibold text-[14px] leading-[21px] font-poppins basis-[13%]">
            Price
          </span>
          <span className="font-semibold text-[14px] leading-[21px] font-poppins basis-[15%]">
            Qty
          </span>
          <span className="font-semibold text-[14px] leading-[21px] font-poppins basis-[18%]">
            Subtotal
          </span>
        </div>
        <RowDetails
          price="12000"
          subTotal="8,311"
          title="Emuulsion Paint"
          content="MSI MEG Trident X 10SD-1012AU Intel i7 10700K, 2070 SUPER, 32GB RAM, 1TB SSD, Windows 10 Home, Gaming Keyboard and Mouse 3 Years Warranty"
          product_img="assets/paint.png"
        />
        <RowDetails
          price="12000"
          subTotal="8,311"
          title="Emuulsion Paint"
          content="MSI MEG Trident X 10SD-1012AU Intel i7 10700K, 2070 SUPER, 32GB RAM, 1TB SSD, Windows 10 Home, Gaming Keyboard and Mouse 3 Years Warranty"
          product_img="assets/paint.png"
        />
      </div>
    </div>
  )
}

export default CartDetails
