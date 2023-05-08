/* eslint-disable @next/next/no-img-element */
import { AuthError } from '@/interface/error.interface'
import {
  useImageUploadMutation,
  useMerchantStoreDetailsQuery,
  usePublishStoreMutation,
} from '@/redux/services/merchant'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import CoverBanner from './CoverBanner'
import { locateId, locateImg } from '@/util/locateImg'
import StoreHeaderSkeleton from '@/ui/skeletonLoader/StoreHeaderSkeleton'
import LogoHolder from './LogoHolder'
import StoreInfo from './StoreInfo'
import PublishAction from './PublishAction'

const AboutStoreHeader = () => {
  const router = useRouter()
  const { data, isLoading } = useMerchantStoreDetailsQuery()
  const [publishStore, { isLoading: publishLoading, error }] =
    usePublishStoreMutation()
  const [imageUpload, { isLoading: fileLoading, error: errors, isSuccess }] =
    useImageUploadMutation()

  if (!isLoading && data === undefined) {
    router.push('/merchant/dashboard/create-store')
  }
  {
    errors && toast.error(errors as string)
  }
  // setPrieviewLink
  const [previewLink, setPreviewLink] = useState<string>('')
  const [storePreviewLink, setStorePreviewLink] = useState<string>('')
  const [isPublished, setIsPublished] = useState<boolean>(
    data?.published === 0 ? false : true
  )
  // set file
  const [file, setFile] = useState<File | null>(null)
  const fileTypes = ['image/png', 'image/jpg', 'image/jpeg', 'application/pdf']

  useEffect(() => {
    if (data) {
      setIsPublished(data.published === 0 ? false : true)
    }
  }, [data])

  // function calls
  const fileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const file = e.target.files[0]
    if (!fileTypes.includes(file.type))
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
      await imageUpload(formData)
      if (isSuccess) {
        toast.success('Image set successfully')
        setPreviewLink('')
        setStorePreviewLink('')
      }
      // router.reload()
    } catch (err) {
      const error = (err as AuthError).data.message
      toast.error(error)
    }
  }

  const storePublisAction = async () => {
    if (data && !isPublished) {
      const response = await publishStore({ id: data.id, value: true }).unwrap()
      setIsPublished(true)
      toast.success(response)
    } else if (data && isPublished) {
      const response = await publishStore({
        id: data.id,
        value: false,
      }).unwrap()
      setIsPublished(false)
      toast.success(response)
    }
  }

  {
    error && toast.error(JSON.stringify(error))
  }
  return (
    <>
      {isLoading ? (
        <StoreHeaderSkeleton />
      ) : (
        <div className="lg:wrapper px-4 lg:p-0 pt-6 lg:pt-12 pb-6">
          <div className="flex  flex-col">
            <h1 className="font-semibold font-poppins pb-4 text-[24px] lg:text-[32px] mb-2 leading-[48px]">
              My Store
            </h1>
            <CoverBanner
              fileLoading={fileLoading}
              fileUpload={fileUpload}
              handleFileUpload={handleFileUpload}
              url={locateImg(data && data.images, 'cover') as string}
              previewLink={previewLink}
            />
            <div className="lg:pt-10 pb-4 w-full justify-between flex">
              <div className="flex ">
                <LogoHolder
                  url={locateImg(data && data.images, 'logo') as string}
                  fileLoading={fileLoading}
                  fileStoreUpload={fileStoreUpload}
                  previewLink={storePreviewLink}
                  handleFileUpload={handleFileUpload}
                />
                <StoreInfo
                  name={data ? data.name : ''}
                  city={data ? data.city : ''}
                  address={data ? data.address : ''}
                  description={data ? data.description : ''}
                />
              </div>
              <PublishAction
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
