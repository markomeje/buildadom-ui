/* eslint-disable @next/next/no-img-element */
import { useMerchantStoreDetailsQuery } from '@/redux/services/store.slice'
import { useImageUploadMutation } from '@/redux/services/validation.service'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const AboutStoreHeader = () => {
  const { data, isLoading } = useMerchantStoreDetailsQuery()
  console.log(data, 'data')
  const [previewLink, setPreviewLink] = useState<string>('')
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
  const handleFileUpload = async () => {
    const formData = new FormData()

    if (!data) return
    formData.append('model', 'store')
    formData.append('model_id', data.id.toString())
    formData.append('role', 'cover')
    formData.append('image', file as File)
    try {
      const response = await imageUpload(formData)
      if (response) toast.success('Cover image set successfully')
      router.reload()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="wrapper pt-12 pb-6">
      <div className="flex flex-col">
        <h1 className="font-semibold font-poppins pb-4 text-[32px] mb-2 leading-[48px]">
          My Store
        </h1>
        <div className="w-full h-[201px]  relative">
          {!previewLink && !data?.images ? (
            <div className="w-full h-full bg-[#4F4F4F]"></div>
          ) : (
            <img
              src={previewLink || (data?.images && data.images[0].url)}
              alt="cover image"
              className="w-full h-full object-cover"
            />
          )}

          <div className="flex items-center  bottom-[40px] right-[50px] absolute">
            <label
              htmlFor="file-upload"
              className="bg-[#534f4f] z-10 cursor-pointer rounded-sm w-[174px] h-[43px]  flex items-center justify-center font-poppins text-white font-[700] text-[16px] leading-[20px]"
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
          <img
            src="/assets/image.png"
            alt="store_image"
            className="w-[204px] mr-8 h-[204px]"
          />
          {isLoading ? (
            <div className="flex items-center justify-center w-[300px]">
              <span className="w-[40px] h-[40px] rounded-[40px] border-2 border-blue-500 animate-spin"></span>
            </div>
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
                  {`${data && data.address}  ${data && data.city}`}
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
