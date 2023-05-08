/* eslint-disable @next/next/no-img-element */
import { Rating } from '@/components/Product'
import { IProduct } from '@/interface/general.interface'
import React, { useEffect, useState } from 'react'
import ReviewSection from './ReviewSection'
import PublishAction from '@/components/PublishAction'
import { usePublishProductMutation } from '@/redux/services/merchant'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { useTypedDispatch, useTypedSelector } from '@/redux/store'
import { specificModal } from '@/redux/reducer/modalReducer'
import { setStepper } from '@/redux/reducer/stepperReducer'
import ModalWraper from '@/modals'
import UseStepper from '@/hooks/useStepper'
import { AddProduct } from '@/lib/stepper'

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
  const dispatch = useTypedDispatch()
  const [publishProduct, { isLoading: publishLoading, error }] =
    usePublishProductMutation()
  const { specificModal: modal, modalType } = useTypedSelector(
    (state) => state.modal
  )
  const { step } = useTypedSelector((state) => state.stepper)

  // published state handler
  const [isPublished, setIsPublished] = useState<boolean>(false)

  // setPublished state on load
  useEffect(() => {
    if (published) {
      console.log(published)
      setIsPublished(published === 0 ? false : true)
    }
  }, [published])

  console.log(isPublished, published, 'nowww')
  // publish action for merchant product
  const productPublisAction = async () => {
    console.log(isPublished, 'isPublished')
    if (isPublished) {
      const response = await publishProduct({ id, value: false }).unwrap()
      setIsPublished(false)
      toast.success(response)
    } else {
      const response = await publishProduct({ id, value: true }).unwrap()
      setIsPublished(true)
      toast.success(response)
    }
  }

  const goBack = () => {
    router.back()
  }

  const handleEdit = () => {
    dispatch(specificModal('product'))
    dispatch(setStepper(1))
  }

  return (
    <>
      {modal && modalType === 'product' && (
        <ModalWraper>
          <UseStepper step={step} stepObject={AddProduct} />
        </ModalWraper>
      )}
      <div className="backGround px-8 py-4 min-h-[500px]">
        {error && toast.error(JSON.stringify(error))}
        <div className="flex w-full justify-between items-center">
          <i
            className="ri-arrow-left-line font-semibold cursor-pointer text-[22px]"
            onClick={goBack}
          ></i>
          <i
            className="ri-edit-2-line ml-4 cursor-pointer text-[22px]"
            onClick={handleEdit}
          ></i>
        </div>
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
              isPublished={published === 0 ? false : true}
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
    </>
  )
}

export default MerchantProductDetails
