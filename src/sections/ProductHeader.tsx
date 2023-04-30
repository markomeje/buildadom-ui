import CategoryGroups from '@/components/CategoryBar'
import { Rating } from '@/components/Product'
import { IStore } from '@/components/StoreModel'
import { useGetProductsCategoriesQuery } from '@/redux/services/store.slice'
import Button from '@/ui/button/Button'
import ExploreSearch from '@/ui/input/MarketSearch'
import Image from 'next/image'
import React from 'react'

const ProductHeader = () => {
  const { data, isLoading } = useGetProductsCategoriesQuery()

  return (
    <div className="border-b mb-5 pt-12 border-gray-200">
      <div className="flex flex-col wrapper ">
        <div className="flex justify-between items-center">
          <div></div>
          <Button
            title="Return to stores"
            classNames="w-[196px] h-[50px] self-end rounded-[50px]"
          />
        </div>
        <div className="h-[330px] mt-8 w-full">
          <Image
            src={'/assets/pbanner.png'}
            alt="store-img"
            width={0}
            height={350}
            sizes="(max-width: 768px) 100vw"
            className="w-full h-[330px] full object-cover"
          />
        </div>
        <div className="flex  pt-12 justify-between">
          <StoreInfo
            name="HouseCraft Nig Ltd."
            img="/assets/market.jpg"
            rating={4}
            content="Start selling your products and advertising your company online to easily meet your customers today."
          />
          <ExploreSearch />
        </div>
        <div className="mt-8">
          <CategoryGroups isLoading={isLoading} data={data} />
        </div>
      </div>
    </div>
  )
}

export default ProductHeader

const StoreInfo = ({ name, img, rating, content }: IStore) => {
  return (
    <div className="flex items-center">
      <Image src={img} alt="src_logo" width={204} height={204} />
      <div className="flex flex-col ml-6 justify-center">
        <h1 className="font-poppins font-semibold text-[28px] leading-[32px]">
          {name}
        </h1>
        <div className="flex items-center py-3">
          <span className="text-[14px] font-[6    00] font-poppins leading-[25px] mr-1 -mb-[3px]">
            Store Rating
          </span>
          <Rating rating={rating as number} />
        </div>
        <span className="w-[500px] font-poppins leading-[27px] text-[16px]">
          {content}
        </span>
      </div>
    </div>
  )
}
