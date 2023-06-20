import React, { ButtonHTMLAttributes } from 'react'

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
  classNames: string
  variant?: string
}

const Button = ({ title, classNames, variant = 'full', ...props }: IButton) => {
  const outlined = 'bg-transparent text-bd-blue border-2 border-sel-blue'
  const full = 'bg-bd-blue text-white border-none'
  const value = variant === 'full' ? full : outlined
  return (
    <button
      className={`flex items-center text-center font-poppins font-[400] tracking-wide justify-center  ${classNames} ${value}`}
      {...props}
    >
      {title}
    </button>
  )
}

export default Button
