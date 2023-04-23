import React from 'react'
import 'react-loading-skeleton/dist/skeleton.css'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

const ListSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#F5F5F5" highlightColor="#ffffff">
      <h3 className="text-center h-[20px] text-[16px] mb-3">
        <Skeleton count={8} />
      </h3>
    </SkeletonTheme>
  )
}

export default ListSkeleton
