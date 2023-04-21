import React from 'react'
import 'react-loading-skeleton/dist/skeleton.css'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

const StoreInfoSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#F5F5F5" highlightColor="#ffffff">
      <div className="flex flex-col">
        <h1 className="font-bold text-[18px] mb-3">
          <Skeleton width={400} height={20} />
        </h1>
        <p className="h-[50px] text-[12px] mb-2">
          <Skeleton count={5} />
        </p>
        <div className="w-[250px] border border-gray-200 h-[2px]">
          <Skeleton width={250} height={1} />
        </div>
      </div>
    </SkeletonTheme>
  )
}

export default StoreInfoSkeleton
