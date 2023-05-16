import MainLayout from '@/layouts/MainLAyout'
import React, { ReactElement } from 'react'

const CustomNotFound = () => {
  return (
    <div className="h-[50vh] w-full flex-col flex items-center justify-center">
      <h1 className="font-bold text-[40px] font-poppins text-red-400">
        404 !!
      </h1>
      <span className="font-bold text-[40px] font-poppins">Page Not Found</span>
    </div>
  )
}

export default CustomNotFound

CustomNotFound.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>
}
