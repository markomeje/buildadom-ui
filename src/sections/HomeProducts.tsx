import EmptyState from '@/components/EmptyState'
import ProductCard from '@/components/Product'
import { IProduct } from '@/interface/general.interface'
import { useTypedSelector } from '@/redux/store'
import ProductSkeleton from '@/ui/skeletonLoader/ProductSkeleton'
import React from 'react'

type IProps = {
  isLoading: boolean | undefined
  data: IProduct[] | undefined
}

const HomeProducts = ({ isLoading, data }: IProps) => {
  const { displayType } = useTypedSelector((state) => state.modal)
  const isGrid = displayType === 'grid'
  console.log(data)
  console.log(data, ' ddd')

  return (
    <div className="w-full">
      {isLoading && <ProductSkeleton amount={10} className="lg:grid-cols-5" />}
      {!isLoading && (
        <div
          className={`flex w-full ${
            isGrid ? 'flex-row  flex-wrap' : 'flex-col lg:gap-3'
          } my-4 lg:my-0 items-start `}
        >
          {data && data.length > 0 ? (
            data.map((product: IProduct) => (
              <ProductCard
                key={product.id}
                img={
                  (product.images && product.images[0]?.url) ||
                  '/assets/paint.png'
                }
                name={product.name}
                price={`$${product.price}`}
                description={product.description}
                reviews={product.reviews || '0'}
                rating={product.rating || 1}
              />
            ))
          ) : (
            <div className="w-full py-4 flex">
              <EmptyState showButton={false} message="NO PRODUCTS UPLOADED" />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default HomeProducts
