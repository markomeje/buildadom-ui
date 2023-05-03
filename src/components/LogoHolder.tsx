/* eslint-disable @next/next/no-img-element */
import React from 'react'

type IProps = {
  previewLink: string
  fileStoreUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleFileUpload: () => void
  url: string
  fileLoading: boolean
}

const LogoHolder = ({
  previewLink,
  fileLoading,
  handleFileUpload,
  url,
  fileStoreUpload,
}: IProps) => {
  return (
    <div>
      {' '}
      {!previewLink && !url ? (
        <label
          htmlFor="store-logo"
          className="w-[204px] mr-8 h-[204px] cursor-pointer hidden lg:flex flex-col bg-gray-100 rounded-[20px] items-center justify-center"
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
        <div className="hidden lg:block relative">
          <label htmlFor="store-logo" className="cursor-pointer">
            <img
              src={previewLink || url}
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
          {previewLink && (
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
    </div>
  )
}

export default LogoHolder
