import EmptyState from '@/components/EmptyState'
import ProductCard from '@/components/Product'
import { IProduct } from '@/interface/general.interface'
import { useTypedSelector } from '@/redux/store'
import React from 'react'

type IProps = {
  data: IProduct[] | undefined
}

const HomeProducts = ({ data }: IProps) => {
  const { displayType } = useTypedSelector((state) => state.modal)
  const isGrid = displayType === 'grid'

  return (
    <div className="w-full">
      <div
        className={`grid grid-cols-2 gap-3 lg:flex w-full ${
          isGrid ? 'flex-row  flex-wrap' : 'flex-col '
        } my-4 lg:my-0 items-start `}
      >
        {data && data.length > 0 ? (
          data
            .slice(0, 5)
            .map((product: IProduct) => (
              <ProductCard
                key={product.id}
                img={
                  (product.images && product.images[0]?.url) ||
                  '/assets/placeholder.jpg'
                }
                id={product.id}
                name={product.name}
                price={`$${product.price}`}
                description={product.description}
                reviews={product.reviews || '0'}
                rating={product.rating || 3}
              />
            ))
        ) : (
          <div className="w-full py-4 flex">
            <EmptyState showButton={false} message="NO PRODUCTS UPLOADED" />
          </div>
        )}
      </div>
    </div>
  )
}

export default HomeProducts
