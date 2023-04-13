/* eslint-disable @next/next/no-img-element */
import { IProduct } from '@/interface/general.interface'
import React from 'react'

const ProductCard = ({
  img,
  description,
  rating,
  reviews,
  price,
}: IProduct) => {
  return (
    <div className="flex flex-col p-2">
      <img
        src={img}
        alt="product image"
        className="w-[200px] h-[156px] object-cover"
      />
      <Rating rating={rating} review={reviews} />
      <span className="font-poppis w-[190px] min-h-[100px] font-poppins text-[13px] leading-[20px]">
        {description}
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
