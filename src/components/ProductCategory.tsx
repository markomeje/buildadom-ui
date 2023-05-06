/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import ProductCard from './Product'

interface IProps {
  header: string
  products: any
}

const ProductCategory = ({ header, products }: IProps) => {
  console.log(products && products, 'images')

  return (
    <div className="w-full mb-4">
      <h1 className="leading-[36px] text-[24px]  font-poppins font-semibold pb-3 w-full border-b border-[#CCCCCC]">
        {header}
      </h1>
      <div className="py-4 flex items-start w-full flex-wrap lg:gap-6">
        {products.map((product: any, index: any) => (
          <ProductCard
            key={index}
            img={
              (product.images && product.images[0]?.url) || '/assets/paint.png'
            }
            name={product.name}
            price={`$${product.price}`}
            description={product.description}
            reviews={product.reviews || '0'}
            rating={product.rating || 1}
            redirectLink={`/merchant/dashboard/product/${product.id}`}
          />
        ))}
      </div>
    </div>
  )
}

export default ProductCategory
