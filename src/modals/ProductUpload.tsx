/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import Button from '@/ui/button/Button'
import { closeModal } from '@/redux/reducer/modalReducer'
import { useTypedDispatch, useTypedSelector } from '@/redux/store'
import { setStepper } from '@/redux/reducer/stepperReducer'
import { toast } from 'react-toastify'
import { useImageUploadMutation } from '@/redux/services/validation.service'
import { initialState, setAddedStepper } from '@/redux/reducer/countryReducer'
import { AuthError } from '@/interface/error.interface'

function ProductUpload() {
  //   const router = useRouter()
  const dispatch = useTypedDispatch()
  const [file, setFile] = useState<File | null>(null)
  const { newProduct } = useTypedSelector((state) => state.dashboard)
  const [previewLink, setPreviewLink] = useState<string>('')
  const [imageUpload, { isLoading }] = useImageUploadMutation()
  const onDrop = useCallback((acceptedFiles: any[]) => {
    const uploadedImage = acceptedFiles[0]
    if (!uploadedImage) return
    setFile(uploadedImage)
    setPreviewLink(window.URL.createObjectURL(uploadedImage))
  }, [])
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
  })

  const closeProductModal = () => {
    dispatch(closeModal())
  }

  const goBack = () => {
    dispatch(setStepper(1))
  }
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    if (!file) return toast.error('select a file')
    const formData = new FormData()
    formData.append('model', 'product')
    formData.append('model_id', newProduct && newProduct.id)
    formData.append('role', 'main')
    formData.append('image', file)

    try {
      // console.log(formData.get('image'), 'image')
      const response = await imageUpload(formData).unwrap()
      dispatch(setAddedStepper(initialState.newProduct))
      console.log(response, 'response')
      if (response) toast.success('uploaded successfully')
      closeProductModal()
    } catch (err) {
      const error = (err as AuthError).data.message
      toast.error(error)
    }
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="flex w-full items-center justify-between">
        <i
          className="ri-arrow-left-line text-[18px] text-gray-500 cursor-pointer"
          onClick={goBack}
        ></i>
        <i
          className="text-[16px] w-[30px] h-[30px] cursor-pointer rounded-[30px] text-[#363339] items-center justify-center flex bg-[#FFF2F2]  ri-close-line"
          onClick={closeProductModal}
        ></i>
      </div>
      <h1 className="text-[#23262F] flex justify-between pb-2  items-center font-semibold font-poppins text-[20px] leading-[40px]">
        <span className="star">Product Image</span>
      </h1>
      <form
        onSubmit={handleSubmit}
        className="mb-4 w-full mx-auto flex flex-col"
      >
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {previewLink ? (
            <img
              src={previewLink}
              alt="cover image"
              className="w-full h-[300px] object-fill"
            />
          ) : (
            <div className="border-gray-300 border-dashed border-2 flex items-center justify-center flex-col  rounded-[12px] h-[180px]">
              <i className="ri-upload-cloud-2-line text-blue-500 text-3xl"></i>
              <p className="font-poppins py-4 text-center px-4 lg:px-0 text-gray-500">
                Drag and drop your file(s) or <span>browse to upload</span>
              </p>
            </div>
          )}
        </div>
        <Button
          classNames="mb-3 mt-6 py-4 w-[80%] rounded-[10px] mx-auto"
          title={isLoading ? 'Uploading...' : 'upload product image'}
        />
      </form>
    </div>
  )
}

export default ProductUpload
