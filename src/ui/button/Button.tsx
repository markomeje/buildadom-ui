import React from 'react'

type IButton = {
  title: string
  classNames: string
  type?: string
  onClick?: () => void
}

const Button = ({ title, classNames, type = 'full', onClick }: IButton) => {
  const outlined = 'bg-transparent text-bd-blue border-2 border-sel-blue'
  const full = 'bg-bd-blue text-white border-none'
  const value = type === 'full' ? full : outlined
  return (
    <button
      className={`flex items-center text-center font-poppins font-semibold tracking-wide justify-center ${value} ${classNames}`}
      onClick={onClick}
    >
      {title}
    </button>
  )
}

export default Button
