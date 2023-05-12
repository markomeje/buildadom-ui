/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import ProductCard from './Product'
import { locateImg } from '@/util/locateImg'

interface IProps {
  header: string
  products: any
}

const ProductCategory = ({ header, products }: IProps) => {
  return (
    <div className="w-full mb-4">
      <h1 className="leading-[36px] capitalize text-[24px]  font-poppins font-semibold pb-3 w-full border-b border-[#CCCCCC]">
        {header}
      </h1>
      <div className="py-4 grid lg:grid-cols-4 grid-cols-2 lg:gap-6">
        {products.map((product: any, index: any) => (
          <ProductCard
            key={index}
            img={locateImg(product.images, 'main') || '/assets/placeholder.jpg'}
            name={product.name}
            price={`${product.currency && product.currency.symbol}${
              product.price
            }`}
            description={product.description}
            reviews={product.reviews || '0'}
            rating={product.rating || 0}
            redirectLink={`/merchant/dashboard/product/${product.id}`}
          />
        ))}
      </div>
    </div>
  )
}

export default ProductCategory
