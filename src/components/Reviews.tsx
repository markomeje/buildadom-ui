import Image from 'next/image'
import React from 'react'
interface IReview {
  img?: string
  title: string
  content: string
  date: string
}

const Reviews = ({ img, title, content, date }: IReview) => {
  return (
    <div className="flex mb-6 items-center">
      <Image
        alt="review-img"
        src={img || '/assets/user.png'}
        width={80}
        height={71}
        className="rounded-[4px] mr-6"
      />
      <div className="flex flex-col">
        <h2 className="font-semibold font-poppins text-[14px] leading-[21px]">
          {title}
        </h2>
        <span className="text-[#5A5A5A] w-[533px] font-poppins text-[12px] leading-[18px] pb-3">
          {content}
        </span>
        <span className="font-poppins text-[#ABABAB] text-[12px] leading-[18px]">
          {date}
        </span>
      </div>
    </div>
  )
}

export default Reviews
