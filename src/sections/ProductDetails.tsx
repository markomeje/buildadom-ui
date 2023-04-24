/* eslint-disable @next/next/no-img-element */
import { Rating } from '@/components/Product'
import { IProduct } from '@/interface/general.interface'
import React from 'react'
import ReviewSection from './ReviewSection'

const ProductDetails = ({
  img,
  description,
  rating,
  reviews,
  name,
  price,
}: IProduct) => {
  return (
    <div className="backGround p-8 min-h-[550px]">
      <div className="w-full border-b relative border-[#CCCCCC] h-[330px]">
        <div className="flex h-[250px] justify-between w-full">
          <img
            src={img}
            className="w-[250px] rounded-[6px] h-[250px] object-cover"
            alt="product-img"
          />
          <div className="flex -ml-20 flex-col">
            <h1 className="text-[24px] mb-3 leading-[36px] font-semibold font-poppins">
              {name}
            </h1>
            <span className="w-[350px] font-poppins uppercase text-[13px] leading-[19px]">
              {description}
            </span>
            <span className="text-[18px] font-poppins font-semibold mt-4 leading-[25px] ">
              {price}
            </span>
          </div>
          <div className="flex items-end h-full justify-between   flex-col">
            <button className="text-bd-blue  border-2 text-[13px] h-[37px] font-semibold font-poppins border-bd-blue w-[160px] flex items-center justify-center rounded-[50px]">
              <i className="ri-shopping-cart-line text-bd-blue mr-2 "></i> Add
              To Card
            </button>
            <span className="font-semibold self-end flex items-center font-poppins text-[14px] text-[#838383]">
              add to wishlist
              <span className="w-[25px] cursor-pointer flex items-center justify-center ml-[10px]  h-[25px] rounded-[25px] border-2 border-[#838383] ">
                <i className="ri-heart-line"></i>
              </span>
            </span>
          </div>
        </div>
        <div className="absolute bottom-0 py-2">
          <Rating rating={rating} review={reviews} />
        </div>
      </div>
      <ReviewSection />
    </div>
  )
}

export default ProductDetails
