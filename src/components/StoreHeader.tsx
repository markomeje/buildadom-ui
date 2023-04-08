/* eslint-disable @next/next/no-img-element */
import { useMerchantStoreDetailsQuery } from '@/redux/services/store.slice'
import React from 'react'

const AboutStoreHeader = () => {
  const { data, isLoading } = useMerchantStoreDetailsQuery()
  
  // const fileTypes = ["image/png", "image/jpg", "image/jpeg", "application/pdf"];
  // const fileLoad = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (!e.target.files) return;

  //   if (!fileTypes.includes(e.target.files[0].type))
  //     return toast.error("upload required file type");
  //   if (e.target.files[0].size > 5120)
  //     return toast.error("file size too large");
  //   handleChange({ ...form, receipt: e.target.files[0] });
  // };

  return (
    <div className="wrapper pt-12 pb-6">
      <div className="flex flex-col">
        <h1 className="font-semibold font-poppins pb-4 text-[32px] mb-2 leading-[48px]">
          My Store
        </h1>
        <div className="w-full h-[201px] bg-[#4F4F4F] relative">
          <label
            htmlFor="file-upload"
            className="bg-[#333333] bottom-[40px] right-[50px] mix-blend-screen w-[174px] h-[43px] absolute flex items-center justify-center font-poppins text-white font-[700] text-[16px] leading-[20px]"
          >
            Upload Image
          </label>
          <input type="file" id='file-upload' className='hidden' />
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
