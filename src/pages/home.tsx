import ProductCard from '@/components/Product'
import MainLayout from '@/layouts/MainLAyout'
import { useAllProductsQuery } from '@/redux/services/general.service'
import HomeBanner from '@/sections/HomeBanner'
import HomeProducts from '@/sections/HomeProducts'
// import { products } from '@/util/products'
import React, { ReactElement } from 'react'

const Home = () => {
  const { data, isLoading } = useAllProductsQuery()
  console.log(data, 'datat')
  return (
    <div className="wrapper">
      <HomeBanner />
      <HomeProducts />

      {isLoading && <div>Loading...</div>}
      {!isLoading && (
        <div className="flex tiems-start gap-6 flex-wrap">
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

export default Home

Home.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>
}
