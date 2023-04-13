import { IProduct } from '@/interface/general.interface'
import React from 'react'
import ProductCard from './Product'

interface IProps {
  header: string
  products: IProduct[]
}

const ProductCategory = ({ header, products }: IProps) => {
  return (
    <div className="w-full mb-4">
      <h1 className="leading-[36px] text-[24px]  font-poppins font-semibold pb-3 w-full border-b border-[#CCCCCC]">
        {header}
      </h1>
      <div className="py-4 flex items-start w-full flex-wrap gap-6">
        {products.map((product, index) => (
          <ProductCard
            key={index}
            img={
              (product.images && product.images[0]?.url) || '/assets/paint.png'
            }
            price={`$${product.price}`}
            description={product.description}
            reviews={product.reviews || '0'}
            rating={product.rating || 1}
          />
        ))}
      </div>
    </div>
  )
}

export default ProductCategory
