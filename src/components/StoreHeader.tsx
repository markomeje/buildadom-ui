/* eslint-disable @next/next/no-img-element */
import {
  useImageUploadMutation,
  useMerchantStoreDetailsQuery,
  usePublishStoreMutation,
} from '@/redux/services/merchant'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import CoverBanner from './CoverBanner'
import { locateId, locateImg } from '@/util/locateImg'
import StoreHeaderSkeleton from '@/ui/skeletonLoader/StoreHeaderSkeleton'
import LogoHolder from './LogoHolder'
import StoreInfo from './StoreInfo'
import PublishAction from './PublishAction'
import { useTypedDispatch } from '@/redux/store'
import { closeModal } from '@/redux/reducer/modalReducer'

const AboutStoreHeader = () => {
  const dispatch = useTypedDispatch()
  const { data, isLoading, isError } = useMerchantStoreDetailsQuery()
  const [publishStore, { isLoading: publishLoading }] =
    usePublishStoreMutation()
  const [imageUpload, { isLoading: fileLoading }] = useImageUploadMutation()
  isError && toast.error('Network error')

  // setPrieviewLink
  const [previewLink, setPreviewLink] = useState<string>('')
  const [storePreviewLink, setStorePreviewLink] = useState<string>('')
  const [openPop, setOpenPop] = useState<boolean>(false)
  const [isPublished, setIsPublished] = useState<boolean>(
    data?.published === 0 ? false : true
  )
  // set file
  const [file, setFile] = useState<File | null>(null)
  const fileTypes = ['image/png', 'image/jpg', 'image/jpeg', 'application/pdf']

  useEffect(() => {
    if (data) {
      setIsPublished(data.published === 0 ? false : true)
      setOpenPop(true)
    }
  }, [data])

  // function calls
  const fileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const file = e.target.files[0]
    if (!fileTypes.includes(file && file.type))
      return toast.error('upload required file type')
    if (window !== undefined) {
      setPreviewLink(window.URL.createObjectURL(file))
      setFile(file)
    }
  }
  const fileStoreUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const file = e.target.files[0]
    if (file) {
      if (!fileTypes.includes(file && file.type))
        return toast.error('upload required file type')
      if (window !== undefined) {
        setStorePreviewLink(window.URL.createObjectURL(file))
        setFile(file)
      }
    }
  }
  const handleFileUpload = async () => {
    const formData = new FormData()
    if (!data) return
    formData.append(
      'id',
      locateId(data.images, `${previewLink ? 'cover' : 'logo'}`)
    )
    formData.append('model', 'store')
    formData.append('model_id', data.id.toString())
    formData.append('role', `${previewLink ? 'cover' : 'logo'}`)
    formData.append('image', file as File)
    try {
      await imageUpload(formData).unwrap()
      toast.success('Image set successfully')
      setPreviewLink('')
      setStorePreviewLink('')
      dispatch(closeModal())
    } catch (err) {
      toast.error(JSON.stringify(err))
    }
  }

  const storePublisAction = async () => {
    if (data && !isPublished) {
      try {
        const response = await publishStore({
          id: data.id,
          value: true,
        }).unwrap()
        setIsPublished(true)
        toast.success(response)
      } catch (error) {
        console.log(error)
      }
    } else if (data && isPublished) {
      try {
        const response = await publishStore({
          id: data.id,
          value: false,
        }).unwrap()
        setIsPublished(false)
        toast.success(response)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const closePopup = () => {
    setOpenPop(false)
  }

  return (
    <>
      {isLoading ? (
        <StoreHeaderSkeleton />
      ) : (
        <div className="lg:wrapper relative px-4 lg:p-0 ">
          <div className="flex  flex-col">
            <PopupModal
              closePopup={closePopup}
              isPublished={isPublished}
              openPop={openPop}
            />
            <h1
              className={`font-semibold font-poppins pb-4 text-[24px] lg:text-[32px] mb-2 leading-[48px] ${
                isPublished && 'mt-12'
              }`}
            >
              My Store
            </h1>
            <CoverBanner
              isError={isError}
              fileLoading={fileLoading}
              fileUpload={fileUpload}
              handleFileUpload={handleFileUpload}
              url={locateImg(data && data.images, 'cover') as string}
              previewLink={previewLink}
            />
            <div className="lg:pt-10 pb-4 w-full justify-between flex lg:flex-row flex-col">
              <div className="flex ">
                <LogoHolder
                  isError={isError}
                  url={locateImg(data && data.images, 'logo') as string}
                  fileLoading={fileLoading}
                  fileStoreUpload={fileStoreUpload}
                  previewLink={storePreviewLink}
                  handleFileUpload={handleFileUpload}
                />
                <StoreInfo
                  name={data ? data.name : 'No Data Available'}
                  city={data ? data.city : ''}
                  address={data ? data.address : 'No Data Available'}
                  description={data ? data.description : ''}
                />
              </div>
              <PublishAction
                isError={isError}
                loading={publishLoading}
                isPublished={isPublished}
                publishAction={storePublisAction}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default AboutStoreHeader

const PopupModal = ({
  closePopup,
  isPublished,
  openPop,
}: {
  closePopup: () => void
  isPublished: boolean
  openPop: boolean
}) => {
  return (
    <>
      {!isPublished && openPop && (
        <div className="w-full sticky top-0 z-[80] justify-between mb-6 lg:mb-8 px-3 font-poppins py-2  border border-yellow-600 bg-yellow-300 flex items-center">
          <span>
            {' '}
            Kindly toggle the button to place your product on Buildadom
            marketplace.
          </span>
          <i className="ri-close-line cursor-pointer" onClick={closePopup}></i>
        </div>
      )}
    </>
  )
}
