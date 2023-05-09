/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { useAllProductsQuery } from '@/redux/services/general.service'
import HomeProducts from '@/sections/HomeProducts'
import { useTypedDispatch } from '@/redux/store'
import { setDisplayType } from '@/redux/reducer/modalReducer'
import ProductSkeleton from '@/ui/skeletonLoader/ProductSkeleton'
import EmptyState from './EmptyState'

const DropSearch = ({ header, text }: { header: string; text: string }) => {
  return (
    <div className="min-w-[176px] mr-2 h-[50px] flex items-center justify-center border-[2px] border-[#CCCCCC] rounded-[2px]">
      <b className="text-[13px] font-semibold font-poppins">{header}</b>{' '}
      <span className="text-[14px] font-[500] font-poppins">{text}</span>
      <i className="ri-arrow-drop-right-line"></i>
    </div>
  )
}

const ExploreProducts = () => {
  const dispatch = useTypedDispatch()
  const { data, isLoading, isSuccess } = useAllProductsQuery()

  const setDisplay = (type: string) => {
    dispatch(setDisplayType(type))
  }

  return (
    <div className="basis-[80%]">
      <div className="items-center flex">
        <DropSearch header="Sort By:" text="All" />
        <DropSearch header="Sort By:" text="All" />
        <div className="flex ml-8">
          <img
            src="/assets/sidebar.png"
            className="mr-3 cursor-pointer"
            alt=""
            onClick={() => setDisplay('grid')}
          />
          <img
            src="/assets/bars.png"
            className="cursor-pointer"
            alt=""
            onClick={() => setDisplay('list')}
          />
        </div>
      </div>
      <div className="w-full my-8">
        {isLoading ? (
          <ProductSkeleton amount={5} className="lg:grid-cols-5" />
        ) : isSuccess ? (
          <HomeProducts data={data} />
        ) : (
          <EmptyState showButton={false} message="NO PRODUCTS UPLOADED" />
        )}
      </div>
    </div>
  )
}

export default ExploreProducts
