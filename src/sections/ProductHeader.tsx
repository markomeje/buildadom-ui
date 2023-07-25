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
    <div className="border-b lg:mb-5 lg:pt-12 border-gray-200">
      <div className="flex flex-col lg:wrapper ">
        <div className="h-[180px] lg:h-[280px] lg:mt-4 w-full">
          <img
            src={cover_img}
            alt="store-cover"
            width={0}
            height={350}
            className="w-full h-[180px] lg:h-[280px] full object-cover"
          />
        </div>
        <div className="flex lg:flex-row px-2 flex-col relative lg:pt-12 lg:justify-between">
          <StoreInfo
            address={city}
            name={name}
            img={logo_img}
            rating={4}
            content={description}
          />
          <ExploreSearch />
        </div>
        <div className="mt-4 lg:mt-8">
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
    <div className="flex flex-col  mb-8 lg:mb-0 lg:px-0 lg:flex-row relative lg:items-center">
      <img
        src={img}
        alt="src_logo"
        width={204}
        height={204}
        className="lg:w-[204px] w-[160px] rounded-[204px] lg:rounded-[4px] h-[160px] absolute lg:relative lg:top-0 -top-[90px] lg:h-[204px]"
      />
      <div className="flex flex-col mt-20 lg:mt-0 lg:ml-6 lg:justify-center">
        <h1 className="font-poppins font-semibold text-[18px] lg:text-[24px] leading-[28px]">
          {name}
        </h1>
        <div className="flex items-center py-1 lg:py-3">
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
        <span className="lg:w-[500px] font-poppins lg:leading-[27px] leading-[23px] text-[12px] lg:text-[14px]">
          {content}
        </span>
      </div>
    </div>
  )
}
