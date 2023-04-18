/* eslint-disable @next/next/no-img-element */
// import { IProduct } from '@/interface/dashboard'
import React from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ProductCard = ({ img, description, rating, reviews, price }: any) => {
  return (
    <div className="flex w-full lg:w-auto mb-8 lg:border-none border-b border-r border-gray-200 p-2  flex-col">
      <img
        src={img}
        alt="product image"
        className="w-[100%] lg:w-[200px] h-[200px] lg:h-[156px] object-cover"
      />
      <Rating rating={rating} review={reviews} />
      <span className="font-poppis w-[90%] lg:w-[190px] min-h-[100px] font-poppins text-[13px] leading-[20px]">
        {description && description.substr(0, 120) + '...'}
      </span>
      <h2 className="font-poppins leading-[25px] font-semibold text-[18px] py-4">
        {price}
      </h2>
    </div>
  )
}

export default ProductCard

const Rating = ({ rating, review }: { rating: number; review: string }) => {
  return (
    <div className="py-2 flex items-center">
      {[...Array(5)].map((start, index) => {
        index + 1
        return (
          <>
            <i
              key={index}
              className={`ri-star-s-fill mr-2 ${
                index < rating ? 'text-[#E9A426]' : 'text-gray-500'
              }`}
            ></i>
          </>
        )
      })}
      <span className="text-[#8C8C8C] font-poppins text-[12px] leading-[25px]">
        Reviews ({review})
      </span>
    </div>
  )
}
