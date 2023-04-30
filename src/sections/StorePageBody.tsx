import StoreModel from '@/components/StoreModel'
import React from 'react'

export const stores = [
  {
    name: 'cusotoBuilds',
    desc: 'Brief description of the company and what kind of products or services they offer',
    img: '/assets/logo2.png',
  },
  {
    name: 'cusotoBuilds',
    desc: 'Brief description of the company and what kind of products or services they offer',
    img: '/assets/market.jpg',
  },
  {
    name: 'cusotoBuilds',
    desc: 'Brief description of the company and what kind of products or services they offer',
    img: '/assets/logo2.png',
  },
  {
    name: 'cusotoBuilds',
    desc: 'Brief description of the company and what kind of products or services they offer',
    img: '/assets/market.jpg',
  },
  {
    name: 'cusotoBuilds',
    desc: 'Brief description of the company and what kind of products or services they offer',
    img: '/assets/logo2.png',
  },
  {
    name: 'cusotoBuilds',
    desc: 'Brief description of the company and what kind of products or services they offer',
    img: '/assets/market.jpg',
  },
  {
    name: 'cusotoBuilds',
    desc: 'Brief description of the company and what kind of products or services they offer',
    img: '/assets/market.jpg',
  },
]

const StorePageBody = () => {
  return (
    <div className="py-12 wrapper">
      <div className="grid grid-cols-5 gap-6">
        {stores &&
          stores.map((store, index) => {
            return (
              <StoreModel
                key={index}
                name={store.name}
                content={store.desc}
                img={store.img}
              />
            )
          })}
      </div>
    </div>
  )
}

export default StorePageBody
