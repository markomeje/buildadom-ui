/* eslint-disable @next/next/no-img-element */
import React from 'react'

type ICover = {
  previewLink: string
  url: string
  fileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleFileUpload: () => void
  fileLoading: boolean
  isError: boolean
}

const CoverBanner = ({
  previewLink,
  url,
  isError,
  fileUpload,
  handleFileUpload,
  fileLoading,
}: ICover) => {
  return (
    <div className="w-full h-[201px]  relative">
      {!previewLink && !url ? (
        <div className="w-full h-full bg-gray-200"></div>
      ) : (
        <img
          src={previewLink || url}
          alt="cover image"
          className="w-full h-full object-cover border border-gray-100"
        />
      )}
      {/* web  label */}
      <div
        className={`lg:flex items-center ${
          isError && 'lg:hidden hidden'
        } hidden bottom-[40px] right-[50px] absolute`}
      >
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
  )
}

export default CoverBanner
