/* eslint-disable @next/next/no-img-element */
import { Rating } from '@/components/Product'
import { IProduct } from '@/interface/general.interface'
import React, { useEffect, useState } from 'react'
import ReviewSection from './ReviewSection'
import PublishAction from '@/components/PublishAction'
import { usePublishProductMutation } from '@/redux/services/merchant'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

interface IProps extends IProduct {
  isLoading?: boolean
  published: number
}

const MerchantProductDetails = ({
  img,
  id,
  description,
  rating,
  reviews,
  name,
  published,
  price,
}: IProps) => {
  const router = useRouter()
  const [publishProduct, { isLoading: publishLoading, error }] =
    usePublishProductMutation()

  // published state handler
  const [isPublished, setIsPublished] = useState<boolean>(
    published === 0 ? false : true
  )

  // setpulished state on load
  useEffect(() => {
    if (published) {
      setIsPublished(published === 0 ? false : true)
    }
  }, [published])

  // publish action for merchant product
  const productPublisAction = async () => {
    if (isPublished) {
      const response = await publishProduct({ id, value: false }).unwrap()
      toast.success(response)
    } else {
      const response = await publishProduct({ id, value: true }).unwrap()
      toast.success(response)
    }
  }

  const goBack = () => {
    router.back()
  }

  return (
    <div className="backGround px-8 py-4 min-h-[500px]">
      {error && toast.error(JSON.stringify(error))}
      <i
        className="ri-arrow-left-line font-semibold cursor-pointer text-[22px]"
        onClick={goBack}
      ></i>
      <div className="w-full border-b mt-4 relative border-[#CCCCCC] h-[330px]">
        <div className="flex justify-between w-full">
          <div className="flex w-[700px]">
            <img
              src={img}
              className="w-[250px] mr-6 rounded-[6px] h-[250px] object-cover"
              alt="product-img"
            />
            <div className="flex  flex-col">
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
          </div>
          <PublishAction
            loading={publishLoading}
            publishAction={productPublisAction}
            isPublished={isPublished}
          />
        </div>
        <div className="absolute bottom-0 py-2">
          <Rating rating={rating} review={reviews} />
        </div>
      </div>
      {reviews === '0' ? (
        <span className="w-full flex items-center justify-center mt-8 text-[#667085] font-poppins pb-2 leading-[30px] text-center text-[20px] font-[500]">
          No REVIEWS PRESENT
        </span>
      ) : (
        <ReviewSection />
      )}
    </div>
  )
}

export default MerchantProductDetails
