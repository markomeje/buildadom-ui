/* eslint-disable @next/next/no-img-element */
import ModalWraper from '@/modals'
import UploadImage from '@/modals/UploadImage'
import { specificModal } from '@/redux/reducer/modalReducer'
import { useTypedDispatch, useTypedSelector } from '@/redux/store'
import React, { useEffect } from 'react'

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
  const { specificModal: modal, modalType } = useTypedSelector(
    (state) => state.modal
  )
  const dispatch = useTypedDispatch()
  useEffect(() => {
    if (previewLink && previewLink.length > 0) {
      dispatch(specificModal('cover_img'))
    }
  }, [dispatch, previewLink])

  return (
    <>
      {modal && modalType === 'cover_img' && (
        <ModalWraper>
          <UploadImage
            loading={fileLoading}
            link={previewLink}
            fileUpload={fileUpload}
            handleSubmit={handleFileUpload}
          />
        </ModalWraper>
      )}
      <div className="w-full h-[201px]  relative">
        {!previewLink && !url ? (
          <div className="w-full h-full bg-gray-200"></div>
        ) : (
          <img
            src={url}
            alt="cover image"
            className="w-full h-full object-cover border border-gray-100"
          />
        )}
        <div
          className={`lg:flex items-center ${
            isError && 'lg:hidden hidden'
          } hidden bottom-[20px] right-[30px] absolute`}
        >
          <label
            htmlFor="file-upload"
            className="bg-blue-400 z-10 cursor-pointer  w-[54px] h-[54px]  rounded-[54px] flex items-center justify-center font-poppins text-white "
          >
            <i className="ri-camera-line text-[25px] text-gray-200"></i>
            <input
              type="file"
              onChange={fileUpload}
              id="file-upload"
              className="hidden"
            />
          </label>
        </div>
      </div>
    </>
  )
}

export default CoverBanner
