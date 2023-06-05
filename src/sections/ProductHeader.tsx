/* eslint-disable @next/next/no-img-element */
import CategoryGroups from '@/components/CategoryBar'
import { Rating } from '@/components/Product'
import { IStore } from '@/components/StoreModel'
import { useGetProductsCategoriesQuery } from '@/redux/services/merchant'
import ExploreSearch from '@/ui/input/MarketSearch'
// import Image from 'next/image'
import React from 'react'

interface IProps {
  address: string
  city: string
  name: string
  description: string
  cover_img: string
  logo_img: string
}

const ProductHeader = ({
  // address,
  city,
  name,
  description,
  logo_img,
  cover_img,
}: IProps) => {
  const { data, isLoading } = useGetProductsCategoriesQuery()

  return (
    <div className="border-b mb-5 pt-12 border-gray-200">
      <div className="flex flex-col wrapper ">
        <div className="h-[280px] mt-4 w-full">
          <img
            src={cover_img}
            alt="store-cover"
            width={0}
            height={350}
            // sizes="(max-width: 768px) 100vw"
            className="w-full h-[280px] full object-cover"
          />
        </div>
        <div className="flex  pt-12 justify-between">
          <StoreInfo
            address={city}
            name={name}
            img={logo_img}
            rating={4}
            content={description}
          />
          <ExploreSearch />
        </div>
        <div className="mt-8">
          {data && (
            <CategoryGroups
              isLoading={isLoading}
              data={data as { value: string; label: string }[]}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductHeader

const StoreInfo = ({ name, img, rating, content }: IStore) => {
  return (
    <div className="flex items-center">
      <img
        src={img}
        alt="src_logo"
        width={204}
        height={204}
        className="w-[204px] h-[204px]"
      />
      <div className="flex flex-col ml-6 justify-center">
        <h1 className="font-poppins font-semibold text-[24px] leading-[28px]">
          {name}
        </h1>
        <div className="flex items-center py-3">
          <span className="text-[14px] font-[600] font-poppins leading-[25px] mr-1 -mb-[3px]">
            Store Rating
          </span>
          <Rating rating={rating as number} />
        </div>
        {/* <div className="flex items-center">
          <span className="text-[14px] font-[600] font-poppins leading-[25px] mr-1 ">
            Location
          </span>
          <span className="font-poppins">{address}</span>
        </div> */}
        <span className="w-[500px] font-poppins leading-[27px] text-[14px]">
          {content}
        </span>
      </div>
    </div>
  )
}
