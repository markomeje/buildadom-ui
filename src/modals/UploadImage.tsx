/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from '@/ui/button/Button'
// import ReactCrop from 'react-image-crop'
// import { useState } from 'react'
import 'react-image-crop/dist/ReactCrop.css'

type IProp = {
  loading: boolean
  link: string
  fileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSubmit: () => void
}

const UploadImage = ({ loading, link, handleSubmit }: IProp) => {
  //   const [crop, setCrop] = useState<any>()
  //   {
  // console.log(crop, 'cropsed')
  //   }
  return (
    <div className="mb-3 max-w-[900px] mx-auto flex flex-col">
      {/* <ReactCrop crop={crop} onChange={(c) => setCrop(c)}> */}
      <img
        src={link}
        alt="cover-image"
        className="flex items-center justify-center flex-col  w-full h-[250px]"
      />
      {/* </ReactCrop> */}

      <div className="flex w-[90%] mx-auto px-4 mb-3 mt-6">
        {/* <label
          htmlFor="file-upload"
          className="py-3 text-[12px] w-[200px] mx-auto"
        >
          <span className="py-3 text-[12px] w-[200px] mx-auto bg-transparent px-12 text-bd-blue border font-poppins border-bd-blue">
            Replace Image
          </span>
          <input
            type="file"
            onChange={fileUpload}
            id="file-upload"
            className="hidden "
          />
        </label> */}
        <Button
          onClick={handleSubmit}
          classNames=" py-3 w-[200px] text-[12px] font-[400] mx-auto"
          title={loading ? 'uploading...' : 'Upload Image'}
        />
      </div>
    </div>
  )
}

export default UploadImage
