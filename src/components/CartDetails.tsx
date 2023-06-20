/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import {
  useDeleteFromCartMutation,
  useGetCartDetailsQuery,
} from '@/redux/services/cart.service'
import ListSkeleton from '@/ui/skeletonLoader/ListSkeleton'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { locateImg } from '@/util/locateImg'
import { useTypedDispatch } from '@/redux/store'
import { decrementTotal, incrementTotal } from '@/redux/reducer/stepperReducer'
import Link from 'next/link'

type ICart = {
  price: string
  title: string
  subTotal: string
  product_img: string
  content: string
  id: number
}

const RowDetails = ({
  price,
  id,
  product_img,
  subTotal,
  title,
  content,
}: ICart) => {
  const dispatch = useTypedDispatch()
  const [deleteFromCart, { isLoading }] = useDeleteFromCartMutation()
  const [qty, setQty] = useState(1)

  useEffect(() => {
    dispatch(incrementTotal(parseInt(subTotal)))
  }, [dispatch, subTotal])

  const incrementQty = () => {
    setQty(qty + 1)
    dispatch(incrementTotal(parseInt(subTotal) * qty))
  }

  const decrementQty = () => {
    if (qty === 1) return
    setQty(qty - 1)
    dispatch(decrementTotal(parseInt(subTotal) * qty))
  }

  const deleteAction = async () => {
    try {
      const response = await deleteFromCart(id).unwrap()
      console.log(response)
      toast.success('Deleeted Successfully')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="mb-2 w-full py-4  border-[#CCCCCC]  border-b flex">
      <div className="basis-[54%] flex">
        <img
          src={product_img}
          alt="product_image"
          className="w-[120px] h-[120px] mr-4"
        />
        <div className="flex flex-col">
          <h1 className="font-poppins text-[16px] leading-[30px] font-semibold">
            {title}
          </h1>
          <span className="font-poppins w-[90%] text-[12px] lowercase leading-[21px]">
            {content}
          </span>
        </div>
      </div>
      <span className="font-semibold text-[14px] leading-[21px] font-poppins basis-[13%]">
        ${price}
      </span>
      <div className="basis-[15%]">
        <div className="bg-[#EBEBEB] relative h-[60px] focus:outline-none text-center  items-center justify-center flex font-semibold  py-[12px] rounded-[6px] w-[70px] border-none ">
          {qty}
          <div className="flex flex-col right-[6px] h-[40px]  justify-between absolute">
            <i
              className="ri-arrow-up-s-line text-[11px] text-[#8C8C8C] cursor-pointer"
              onClick={incrementQty}
            ></i>
            <i
              className="ri-arrow-down-s-line text-[11px] text-[#8C8C8C] cursor-pointer"
              onClick={decrementQty}
            ></i>
          </div>
        </div>
      </div>
      <div className="basis-[18%] flex">
        <span className="font-semibold text-[14px] leading-[21px] font-poppins">
          ${parseInt(subTotal) * qty}
        </span>
        <i
          onClick={deleteAction}
          className={`${
            isLoading ? 'ri-more-line' : 'ri-delete-bin-3-line'
          } cursor-pointer text-[18px] ml-8 text-red-500 `}
        ></i>
      </div>
    </div>
  )
}

const CartDetails = () => {
  const { data, isLoading, isSuccess } = useGetCartDetailsQuery()
  console.log(data, 'data cart')
  return (
    <div className="basis-[65%] mr-12">
      <div className="flex flex-col">
        <div className="flex border-[#CCCCCC] pb-2 border-b">
          <span className="font-semibold text-[14px] leading-[21px] font-poppins  basis-[54%]">
            Item
          </span>
          <span className="font-semibold text-[14px] leading-[21px] font-poppins basis-[13%]">
            Price
          </span>
          <span className="font-semibold text-[14px] leading-[21px] font-poppins basis-[15%]">
            Qty
          </span>
          <span className="font-semibold text-[14px] leading-[21px] font-poppins basis-[18%]">
            Subtotal
          </span>
        </div>
        {isLoading ? (
          <ListSkeleton />
        ) : isSuccess && data && data.items.length > 0 ? (
          data.items.map((item: any) => (
            <RowDetails
              key={item.id}
              id={item.id}
              price={item.product.price}
              title={item.product.name}
              content={`${item.product.description.substring(0, 200)}...`}
              subTotal={item.product.price}
              product_img={locateImg(item.product.images, 'main') as string}
            />
          ))
        ) : (
          <div className="pt-16 flex flex-col items-center justify-center">
            <span className="w-[410px] text-[#667085] font-poppins pb-2 -mt-4 leading-[30px] text-center text-[20px] font-[500]">
              No Product in cart
            </span>
            <Link
              href="/explore"
              className="py-3 mt-2 bg-bd-blue font-poppins text-white  rounded-[25px] px-8"
            >
              {' '}
              Shop Now{' '}
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default CartDetails
