/* eslint-disable @next/next/no-img-element */
import { IProduct } from '@/interface/dashboard'
import { useTypedSelector } from '@/redux/store'
import React from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ProductCard = ({
  img,
  description,
  rating,
  reviews,
  name,
  price,
}: IProduct) => {
  const { displayType } = useTypedSelector((state) => state.modal)
  const isGrid = displayType === 'grid'
  return (
    <div
      className={`flex w-full lg:w-auto mb-4 lg:border-none border-b border-r border-gray-200 p-2  ${
        isGrid
          ? 'flex-col'
          : 'flex-row  border-b-2  h-[300px] p-4  border-gray-400 '
      }`}
    >
      <div className={`flex  flex-col ${!isGrid && 'mr-6'}`}>
        <img
          src={img}
          alt="product image"
          className={`w-[100%] object-center  h-[200px] ${
            isGrid ? 'lg:h-[156px] lg:w-[200px]' : 'h-[250px] w-[250px]'
          } object-cover`}
        />
        <Rating rating={rating} review={reviews} />
        <div
          className={`${
            isGrid ? 'flex' : 'hidden'
          } items-center justify-end mr-2`}
        >
          <i className="ri-shopping-cart-line text-bd-blue mr-2 cursor-pointer"></i>
          <i className="ri-heart-line text-red-500 cursor-pointer"></i>
        </div>
      </div>
      <div
        className={`flex flex-col ${
          isGrid ? '' : 'h-full justify-center ml-4 w-[500px]'
        }`}
      >
        <h2
          className={`text-[15px] ${
            isGrid ? 'text-bd-blue && mb-1' : 'text-[24px] mb-3 leading-[36px]'
          } font-poppins font-semibold`}
        >
          {name}
        </h2>
        <span
          className={`font-poppis w-[90%] ${
            isGrid ? 'lg:w-[190px] h-[80px]' : 'w-[360px] mb-3'
          } uppercase font-poppins text-[13px] leading-[20px]`}
        >
          {description && description.substring(0, 80) + '...'}
        </span>
        <h2
          className={`font-poppins ${
            isGrid ? 'text-[18px] leading-[25px]  ' : 'text-[14px]'
          } font-semibold `}
        >
          {price}
        </h2>
        <div
          className={`${
            isGrid ? 'hidden' : 'flex'
          } items-center mt-12 justify-between`}
        >
          <button className="text-bd-blue border-2 text-[14px] h-[37px] font-semibold font-poppins border-bd-blue w-[160px] flex items-center justify-center rounded-[50px]">
            <i className="ri-shopping-cart-line text-bd-blue mr-2 "></i> Add To
            Card
          </button>
          <span className="font-semibold flex items-center font-poppins text-[14px] text-[#838383]">
            add to wishlist
            <span className="w-[25px] cursor-pointer flex items-center justify-center ml-[10px]  h-[25px] rounded-[25px] border-2 border-[#838383] ">
              <i className="ri-heart-line"></i>
            </span>
          </span>
        </div>
      </div>
    </div>
  )
}

export default ProductCard

const Rating = ({ rating, review }: { rating: number; review: string }) => {
  return (
    <div className="pt-2 flex items-center">
      {[...Array(5)].map((start, index) => {
        index + 1
        return (
          <div key={index}>
            <i
              className={`ri-star-s-fill mr-2 ${
                index < rating ? 'text-[#E9A426]' : 'text-gray-500'
              }`}
            ></i>
          </div>
        )
      })}
      <span className="text-[#8C8C8C] font-poppins text-[12px] leading-[25px]">
        Reviews ({review})
      </span>
    </div>
  )
}
