import BuyerSidebar from '@/components/BuyerSidebar'
import FavouriteProducts from '@/components/FavouriteProducts'
import MainLayout from '@/layouts/MainLAyout'
import React, { ReactElement } from 'react'

const WishList = () => {
  return (
    <BuyerSidebar header="My Wishlist">
      <div className="flex flex-col w-full">
        <h1 className="font-poppins text-[18px] leading-[36px] font-semibold pb-2 border-b border-[#CCCCCC]">
          Product Wishlist
        </h1>
        <div className="flex py-6 flex-wrap items-center">
          <FavouriteProducts />
          <FavouriteProducts />
          <FavouriteProducts />
          <FavouriteProducts />
          <FavouriteProducts />
        </div>
      </div>
    </BuyerSidebar>
  )
}

export default WishList

WishList.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>
}
