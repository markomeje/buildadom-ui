import Image from 'next/image'
import React from 'react'

const images: string[] = [
  '/assets/subscribe/sup1.png',
  '/assets/subscribe/sup2.png',
  '/assets/subscribe/sup3.png',
  '/assets/subscribe/sup4.png',
  '/assets/subscribe/sup5.png',
  '/assets/subscribe/sup6.png',
]

const Subscriptions = () => {
  return (
    <div className="flex w-full justify-between py-4 items-center">
      {images.map((x, i) => {
        return <Logo src={x} key={i} />
      })}
    </div>
  )
}

export default Subscriptions

const Logo = ({ src }: { src: string }) => (
  <Image
    src={src}
    width={152}
    height={80}
    alt="support-logo"
    className="mr-4"
  />
)
