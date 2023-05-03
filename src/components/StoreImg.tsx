/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

interface IStoreImg {
  name: string
  img: string
  id?: number
  like?: boolean
}

const StoreImg = ({ name, img, id, like }: IStoreImg) => {
  const router = useRouter()
  console.log(router, 'router')
  return (
    <div className="w-[232px] h-[350px] relative">
      <img
        src={img}
        alt="store-img"
        width={232}
        height={350}
        className="w-[232px] h-[350px] full object-cover"
      />
      <div className="absolute top-0 left-0 bottom-0  cursor-pointer  right-0 backG">
        <div className="flex flex-col w-full h-full relative items-center justify-center">
          <span className="text-white font-poppins font-[700] text-[24px] tracking-wider leading-[28px]">
            {name}
          </span>
          {like && (
            <div className="w-[30px] flex items-center justify-center h-[30px] rounded-[30px] border-2 absolute top-4 right-4 border-gray-200">
              <i className="ri-heart-line text-gray-400 font-poppin cursor-pointer"></i>
            </div>
          )}
          <Link
            href={`/stores/${id}/products`}
            className="capitalize text-[14px] text-gray-200 underline absolute bottom-6 font-poppins"
          >
            see all products
          </Link>
        </div>
      </div>
    </div>
  )
}

export default StoreImg
