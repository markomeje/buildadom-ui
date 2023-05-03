import ListSkeleton from '@/ui/skeletonLoader/ListSkeleton'
import React from 'react'

const CategoryBar = ({ text }: { text: string }) => {
  return (
    <button className="border border-[#CCCCCC] rounded-[2px] mr-3 outline-none  min-w-fit  w-fit py-2  flex items-center justify-center text-center font-semibold font-poppins  px-6 ">
      <span className="text-[12px]">{text}</span>
    </button>
  )
}

const CategoryGroups = ({
  isLoading,
  data,
}: {
  isLoading: boolean
  data: { value: string; label: string }[]
}) => {
  return (
    <div className="flex pb-8 w-full pt-6 overflow-x-scroll items-center">
      {isLoading && <ListSkeleton />}
      {data &&
        data.map((category, index) => {
          return <CategoryBar key={index} text={category.label as string} />
        })}
    </div>
  )
}

export default CategoryGroups
