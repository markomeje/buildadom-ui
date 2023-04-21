import ProductCard from '@/components/Product'
import { IProduct } from '@/interface/general.interface'
import { useAllProductsQuery } from '@/redux/services/general.service'
import ProductSkeleton from '@/ui/skeletonLoader/ProductSkeleton'
import React from 'react'

const HomeProducts = () => {
  const { data, isLoading } = useAllProductsQuery()

  return (
    <div className="flex flex-col  px-6 lg:px-0 items-start py-8">
      <h2 className="text-[22px] leading-[33px] mb-6 font-poppins font-semibold">
        New Products
      </h2>
      {isLoading && <ProductSkeleton amount={10} className="lg:grid-cols-5" />}
      {!isLoading && (
        <div className="flex my-4 lg:my-0 items-start lg:gap-6 flex-wrap">
          {data &&
            data.map((product: IProduct) => (
              <ProductCard
                key={product.id}
                img={
                  (product.images && product.images[0]?.url) ||
                  '/assets/paint.png'
                }
                price={`$${product.price}`}
                description={product.description}
                reviews={product.reviews || '0'}
                rating={product.rating || 1}
              />
            ))}
        </div>
      )}
    </div>
  )
}

export default HomeProducts
