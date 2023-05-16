/* eslint-disable @next/next/no-img-element */
import ModalWraper from '@/modals'
import UploadImage from '@/modals/UploadImage'
import { specificModal } from '@/redux/reducer/modalReducer'
import { useTypedDispatch, useTypedSelector } from '@/redux/store'
import React, { useEffect } from 'react'

type IProps = {
  previewLink: string
  fileStoreUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleFileUpload: () => void
  url: string
  fileLoading: boolean
  isError: boolean
}

const LogoHolder = ({
  previewLink,
  fileLoading,
  handleFileUpload,
  url,
  fileStoreUpload,
  isError,
}: IProps) => {
  const { specificModal: modal, modalType } = useTypedSelector(
    (state) => state.modal
  )
  const dispatch = useTypedDispatch()
  useEffect(() => {
    if (previewLink && previewLink.length > 0) {
      dispatch(specificModal('logo_img'))
    }
  }, [previewLink, dispatch])
  return (
    <>
      {modal && modalType === 'logo_img' && (
        <ModalWraper>
          <UploadImage
            loading={fileLoading}
            link={previewLink}
            fileUpload={fileStoreUpload}
            handleSubmit={handleFileUpload}
          />
        </ModalWraper>
      )}
      <div className="absolute lg:relative  right-3 lg:right-auto lg:top-auto top-[210px]">
        {' '}
        {isError ? (
          <img
            src="/assets/placeholder.jpg"
            alt="store_image"
            className="lg:w-[204px] w-[120px]  lg:mr-8 lg:h-[204px] object-fill lg:round-0 rounded-[120px] border-gray-200 lg:border-0 border-2 h-[120px] "
          />
        ) : !previewLink && !url ? (
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
          <div className="block relative">
            <label htmlFor="store-logo" className="cursor-pointer">
              <img
                src={url}
                alt="store_image"
                className="lg:w-[204px] w-[120px] lg:mr-8 lg:h-[204px] object-fill lg:rounded-none rounded-[120px] border-gray-200 lg:border-0 border-2 h-[120px] "
              />
              <input
                type="file"
                onChange={fileStoreUpload}
                id="store-logo"
                className="hidden"
              />
            </label>
          </div>
        )}
      </div>
    </>
  )
}

export default LogoHolder
