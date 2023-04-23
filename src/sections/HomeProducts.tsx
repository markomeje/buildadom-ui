import ProductCard from '@/components/Product'
import { IProduct } from '@/interface/general.interface'
import { useTypedSelector } from '@/redux/store'
import ProductSkeleton from '@/ui/skeletonLoader/ProductSkeleton'
import React from 'react'

type IProps = {
  isLoading: boolean
  data: IProduct[]
}

const HomeProducts = ({ isLoading, data }: IProps) => {
  const { displayType } = useTypedSelector((state) => state.modal)
  const isGrid = displayType === 'grid'
  console.log(data)

  return (
    <>
      {isLoading && <ProductSkeleton amount={10} className="lg:grid-cols-5" />}
      {!isLoading && (
        <div
          className={`flex w-full ${
            isGrid ? 'flex-row lg:gap-6 flex-wrap' : 'flex-col lg:gap-3'
          } my-4 lg:my-0 items-start `}
        >
          {data &&
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
              // <d iv key={index}>hsaa</d>
            ))}
        </div>
      )}
    </>
  )
}

export default HomeProducts
