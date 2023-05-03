/* eslint-disable @typescript-eslint/no-unused-vars */
import Button from '@/ui/button/Button'
import React from 'react'
import StoreImg from './StoreImg'

export interface IStore {
  name: string
  content: string
  id?: number
  rating?: number
  img: string
}

const StoreModel = ({ name, content, id, img }: IStore) => {
  return (
    <div className="flex items-center mr-6 mb-6 flex-col">
      <StoreImg name={name} img={img} like id={id} />
      <span className="py-4 w-[232px] font-poppins text-[13px] leading-[19px]">
        {content}
      </span>
      <Button
        type="outline"
        classNames="w-[232px] text-[12px] py-[10px] border-bd-blue rounded-[50px] mt-4"
        title="visit store"
      />
    </div>
  )
}

export default StoreModel
