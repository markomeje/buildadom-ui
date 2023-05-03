/* eslint-disable @next/next/no-img-element */
import { AuthError } from '@/interface/error.interface'
import { useMerchantStoreDetailsQuery } from '@/redux/services/merchant'
import { useImageUploadMutation } from '@/redux/services/validation.service'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import CoverBanner from './CoverBanner'
import { locateImg } from '@/util/locateImg'
import StoreHeaderSkeleton from '@/ui/skeletonLoader/StoreHeaderSkeleton'
import LogoHolder from './LogoHolder'
import StoreInfo from './StoreInfo'

const AboutStoreHeader = () => {
  const router = useRouter()
  const { data, isLoading } = useMerchantStoreDetailsQuery()
  if (!isLoading && data === undefined) {
    router.push('/merchant/dashboard/create-store')
  }
  const [previewLink, setPreviewLink] = useState<string>('')
  const [storePreviewLink, setStorePreviewLink] = useState<string>('')
  const [imageUpload, { isLoading: fileLoading }] = useImageUploadMutation()
  console.log(data, 'datta')

  const [file, setFile] = useState<File | null>(null)
  const fileTypes = ['image/png', 'image/jpg', 'image/jpeg', 'application/pdf']
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
    formData.append('model', 'store')
    formData.append('model_id', data.id.toString())
    formData.append('role', `${previewLink ? 'cover' : 'main'}`)
    formData.append('image', file as File)
    try {
      const response = await imageUpload(formData)
      if (response) toast.success('Image set successfully')
      router.reload()
    } catch (err) {
      const error = (err as AuthError).data.message
      toast.error(error)
    }
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
            <div className="lg:pt-10 pb-4 flex items-center">
              <LogoHolder
                url={locateImg(data && data.images, 'main') as string}
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
          </div>
        </div>
      )}
    </>
  )
}

export default AboutStoreHeader
