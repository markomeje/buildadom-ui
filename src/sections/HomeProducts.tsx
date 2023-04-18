import ProductCard from '@/components/Product'
import { useAllProductsQuery } from '@/redux/services/general.service'
import Loader from '@/ui/general/Loader'
import React from 'react'

const HomeProducts = () => {
  const { data, isLoading } = useAllProductsQuery()

  return (
    <div className="flex flex-col  px-6 lg:px-0 items-start py-8">
      <h2 className="text-[22px] leading-[33px] font-poppins font-semibold">
        New Products
      </h2>
      {isLoading && <Loader />}
      {!isLoading && (
        <div className="flex my-4 lg:my-0 items-start lg:gap-6 flex-wrap">
          {data &&
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            data.map((product: any) => (
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
