import EmptyState from '@/components/EmptyState'
import ProductCard from '@/components/Product'
import { IProduct } from '@/interface/general.interface'
import MainLayout from '@/layouts/MainLAyout'
import ProductLayout from '@/layouts/ProdutLayout'
import {
  useGetProductDetailsQuery,
  useGetQueryByCategoryQuery,
} from '@/redux/services/general.service'
import ProductDetails from '@/sections/ProductDetails'
import ProductSkeleton from '@/ui/skeletonLoader/ProductSkeleton'
import StoreInfoSkeleton from '@/ui/skeletonLoader/StoreInfoSkeleton'
import { locateImg } from '@/util/locateImg'
import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'

const InvidualProduct = () => {
  const router = useRouter()
  const {
    data: info,
    isLoading: loading,
    isSuccess,
  } = useGetProductDetailsQuery(parseInt(router.query.id as string))
  const {
    data,
    isLoading,
    isSuccess: success,
  } = useGetQueryByCategoryQuery(info?.category?.id as number)

  return (
    <ProductLayout>
      {loading ? (
        <StoreInfoSkeleton />
      ) : isSuccess && info ? (
        <ProductDetails
          id={info.id}
          name={info.name}
          price={`${info.currency?.symbol} ${info.price}`}
          rating={info.rating ? info.rating : 0}
          reviews={info.reviews ? info.reviews : '0'}
          img={locateImg(info.images, 'main') as string}
          description={info.description}
        />
      ) : (
        <EmptyState showButton={false} message="NO PRODUCT DETAIL" />
      )}

      <div className="pt-12 w-full">
        <h2 className="font-poppins mb-4 font-semibold text-[22px] leading-[33px]">
          Related Products
        </h2>
        <div className="flex">
          {isLoading ? (
            <ProductSkeleton amount={5} className="lg:grid-cols-5" />
          ) : success ? (
            data
              .slice(0, 4)
              .map((product: IProduct) => (
                <ProductCard
                  id={product.id}
                  key={product.id}
                  img={
                    (product.images && product.images[0]?.url) ||
                    '/assets/placeholder.jpg'
                  }
                  name={product.name}
                  price={`$${product.price}`}
                  description={product.description}
                  reviews={product.reviews || '0'}
                  rating={product.rating || 0}
                />
              ))
          ) : (
            <div className="w-full py-4 flex">
              <EmptyState showButton={false} message="NO PRODUCTS UPLOADED" />
            </div>
          )}
        </div>
      </div>
    </ProductLayout>
  )
}

export default InvidualProduct
InvidualProduct.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>
}
