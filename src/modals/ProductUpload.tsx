/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
// import { toast } from 'react-toastify'
// import { useRouter } from 'next/router'
import Button from '@/ui/button/Button'
import { closeModal } from '@/redux/reducer/modalReducer'
import { useTypedDispatch } from '@/redux/store'

function ProductUpload() {
  //   const router = useRouter()
  const dispatch = useTypedDispatch()
  const [file, setFile] = useState<File | null>(null)
  const onDrop = useCallback((acceptedFiles: any[]) => {
    const uploadedImage = acceptedFiles[0]
    if (!uploadedImage) return
    setFile(uploadedImage)
  }, [])
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
  })

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    // if (!file) return toast.error('select a file')
    // const formData = new FormData()
    // formData.append('model', 'identification')
    // formData.append('model_id', data && data.id)
    // formData.append('role', 'main')
    // formData.append('image', file)

    // try {
    //   const response = await imageUpload(formData)
    //   if (response) toast.success('ID uploaded successfully')
    //   router.push('/dashboard')
    // } catch (error) {
    //   console.log(error)
    // }
  }

  const closeProductModal = () => {
    dispatch(closeModal())
  }

  return (
    <div className="p-8">
      <h1 className="text-[#23262F] flex justify-between pb-2  items-center font-semibold font-poppins text-[20px] leading-[40px]">
        <span className="star">Product Image</span>
        <i
          className="text-[16px] w-[30px] h-[30px] cursor-pointer rounded-[30px] text-[#363339] items-center justify-center flex bg-[#FFF2F2]  ri-close-line"
          onClick={closeProductModal}
        ></i>
      </h1>
      <form
        onSubmit={handleSubmit}
        className="mb-4 w-full mx-auto flex flex-col"
      >
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <div className="border-gray-300 border-dashed border-2 flex items-center justify-center flex-col  rounded-[12px] h-[180px]">
            <i className="ri-upload-cloud-2-line text-blue-500 text-3xl"></i>
            <p className="font-poppins py-4 text-gray-500">
              Drag and drop your file(s) or <span>browse to upload</span>
            </p>
            <p className="font-poppins  text-gray-700">{file && file.name}</p>
          </div>
        </div>
        <Button
          classNames="mb-3 mt-6 py-4 w-[80%] rounded-[10px] mx-auto"
          title={'upload product image'}
        />
      </form>
    </div>
  )
}

export default ProductUpload
