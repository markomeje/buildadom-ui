import React from 'react'
import 'react-loading-skeleton/dist/skeleton.css'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import { IProductSkeleton } from './interface'

const ProductSkeleton = ({ amount, className }: IProductSkeleton) => {
  const rows = []
  for (let index = 0; index < amount; index++) {
    rows.push(
      <div
        className="w-full items-center justify-center flex mx-auto"
        key={index}
      >
        <article className="lg:min-w-[200px] w-[400px] lg:w-[230px]  m-auto border-[2px] border-gray-100 rounded-[8px] p-4">
          <div className="flex items-center justify-center mb-4">
            <Skeleton width={140} height={140} />
          </div>
          <h3 className="text-center h-[50px] text-[16px] mb-3">
            <Skeleton count={4} />
          </h3>
          <div className="flex items-center justify-start mt-16 p-4">
            <Skeleton height={30} width={80} />
          </div>
        </article>
      </div>
    )
  }

  return (
    <SkeletonTheme baseColor="#F5F5F5" highlightColor="#ffffff">
      <div
        className={`grid grid-cols-1 gap-6 justify-center grid-flow-dense ${className}`}
      >
        {rows}
      </div>
    </SkeletonTheme>
  )
}

export default ProductSkeleton
