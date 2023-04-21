import React from 'react'
import 'react-loading-skeleton/dist/skeleton.css'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

const ProfileImgSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#F5F5F5" highlightColor="#ffffff">
      <Skeleton height={400} width={400} circle={true} />
    </SkeletonTheme>
  )
}

export default ProfileImgSkeleton
