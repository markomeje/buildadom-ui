/* eslint-disable @next/next/no-img-element */
import { AuthError } from '@/interface/error.interface'
import { useMerchantStoreDetailsQuery } from '@/redux/services/store.slice'
import { useImageUploadMutation } from '@/redux/services/validation.service'
import Loader from '@/ui/general/Loader'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const AboutStoreHeader = () => {
  const { data, isLoading } = useMerchantStoreDetailsQuery()
  const [previewLink, setPreviewLink] = useState<string>('')
  const [storePreviewLink, setStorePreviewLink] = useState<string>('')
  const [imageUpload, { isLoading: fileLoading }] = useImageUploadMutation()
  const [file, setFile] = useState<File | null>(null)
  const router = useRouter()
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
    <div className="lg:wrapper px-4 lg:p-0 pt-6 lg:pt-12 pb-6">
      <div className="flex  flex-col">
        <h1 className="font-semibold font-poppins pb-4 text-[24px] lg:text-[32px] mb-2 leading-[48px]">
          My Store
        </h1>
        <div className="w-full h-[201px]  relative">
          {!previewLink && !data?.images ? (
            <div className="w-full h-full bg-[#4F4F4F]"></div>
          ) : (
            <img
              src={
                previewLink ||
                (data?.images && data.images[0] && data.images[0].url)
              }
              alt="cover image"
              className="w-full h-full object-cover"
            />
          )}

          <div className="flex items-center  bottom-[40px] right-[50px] absolute">
            <label
              htmlFor="file-upload"
              className="bg-[#747272] z-10 cursor-pointer rounded-sm w-[174px] h-[43px]  flex items-center justify-center font-poppins text-white font-[700] text-[16px] leading-[20px]"
            >
              {previewLink ? 'Change File' : 'Upload Image'}
              <input
                type="file"
                onChange={fileUpload}
                id="file-upload"
                className="hidden"
              />
            </label>
            {previewLink && (
              <button
                onClick={handleFileUpload}
                className="bg-[#534f4f] ml-3 z-10 rounded-sm cursor-pointer w-[174px] h-[43px]  flex items-center justify-center font-poppins text-white font-[700] text-[16px] leading-[20px]"
              >
                {fileLoading ? 'Uploading...' : 'Submit'}
              </button>
            )}
          </div>
        </div>
        <div className="pt-10 pb-4 flex items-center">
          {!storePreviewLink && !data?.images?.['1'] ? (
            <label
              htmlFor="store-logo"
              className="w-[204px] mr-8 h-[204px] cursor-pointer flex flex-col bg-gray-300 items-center justify-center"
            >
              <i className="ri-upload-cloud-line text-blue-400 text-[55px]"></i>
              <i className="ri-upload-cloud-line text-white hover:text-[18px] duration-300  rounded-[50%] cursor-pointer text-[22px]"></i>
              <input
                type="file"
                onChange={fileStoreUpload}
                id="store-logo"
                className="hidden"
              />
            </label>
          ) : (
            <div className="relative">
              <label htmlFor="store-logo" className="cursor-pointer">
                <img
                  src={
                    storePreviewLink ||
                    (data?.images && data.images[1] && data.images[1].url)
                  }
                  alt="store_image"
                  className="w-[204px] mr-8 h-[204px]"
                />
                <input
                  type="file"
                  onChange={fileStoreUpload}
                  id="store-logo"
                  className="hidden"
                />
              </label>
              {storePreviewLink && (
                <button
                  className="flex items-center justify-center bg-blue-400 w-[40px] h-[40px] absolute left-0 bottom-0 rounded-[40px]"
                  onClick={handleFileUpload}
                >
                  {fileLoading ? (
                    <span className="w-[20px] h-[20px] rounded-[20px] border border-white"></span>
                  ) : (
                    <i className="ri-upload-cloud-line text-white hover:text-[18px] duration-300  rounded-[50%] cursor-pointer text-[22px]"></i>
                  )}
                </button>
              )}
            </div>
          )}

          {isLoading ? (
            <Loader />
          ) : data === null ? (
            <div>No Store Data</div>
          ) : (
            <div className="flex flex-col justify-center">
              <h1 className="font-semibold font-poppins pb-2 text-[24px] leading-[38px]">
                {data && data.name}
              </h1>
              <p className="w-[550px] font-poppins text-[15px]  leading-[27px]">
                {data && data.description}
              </p>
              <div className="w-[262px] my-4 bg-[#CCCCCC] h-[1px]"></div>
              <div className="flex items-center justify-center">
                <i className="ri-map-pin-2-fill mr-1 text-[18px] text-bd-blue"></i>
                <span className="w-[550px] font-poppins text-[16px]  leading-[27px]">
                  {`${data && data?.address}  ${data && data?.city}`}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AboutStoreHeader
