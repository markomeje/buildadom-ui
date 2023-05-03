import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

const StoreHeaderSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#F5F5F5" highlightColor="#ffffff">
      <div className="wrapper flex py-12 flex-col">
        <h1 className="font-bold text-[18px] mb-5">
          <Skeleton width={400} height={20} />
        </h1>

        <div className="block mb-4 w-full">
          <Skeleton height={200} />
        </div>

        <div className="flex flex-col lg:flex-row">
          <div className="flex items-center lg:justify-start justify-center lg:w-[200px] w-full mb-4 mr-8">
            <Skeleton width={200} height={200} />
          </div>
          <div className="flex py-6 flex-col">
            <h3 className="text-center h-[20px] text-[20px] mb-3">
              <Skeleton count={5} width={400} height={20} />
            </h3>
          </div>
        </div>
      </div>
    </SkeletonTheme>
  )
}

export default StoreHeaderSkeleton
