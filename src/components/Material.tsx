/* eslint-disable @next/next/no-img-element */
import React from 'react'

type IProps = {
  icon: string
  header: string
  bg: string
  contents: string[]
}

const Material = ({ icon, header, bg, contents }: IProps) => {
  return (
    <div
      className={`${bg} flex min-h-[400px] mb-4 md:mb-0 rouned-lg flex-col p-8`}
    >
      <img
        src={icon}
        alt="svg-1"
        className="w-[50px] h-[50px] object-cover mb-3"
      />
      <h2 className="font-poppins font-[500] text-[24px] mb-3 text-[#333333] leading-[36px] ">
        {header}
      </h2>
      {contents.map((content: string, i: number) => (
        <List key={i} text={content} />
      ))}
    </div>
  )
}

export default Material

const List = ({ text }: { text: string }) => (
  <div className="flex mb-5">
    <div className="h-full w-[15px] flex items-start justify-center mt-2 mr-[6px]">
      <span className="w-[10px] h-[10px] gradient rounded-[10px]"></span>
    </div>
    <span className="text-[#4F4F4F] font-poppins leading-[27px] text-[17px] ">
      {text}
    </span>
  </div>
)
