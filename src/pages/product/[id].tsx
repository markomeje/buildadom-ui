import EmptyState from '@/components/EmptyState'
import ProductCard from '@/components/Product'
import { IProduct } from '@/interface/general.interface'
import MainLayout from '@/layouts/MainLAyout'
import ProductLayout from '@/layouts/ProdutLayout'
import { useAllProductsQuery } from '@/redux/services/general.service'
import ProductDetails from '@/sections/ProductDetails'
import ProductSkeleton from '@/ui/skeletonLoader/ProductSkeleton'
import React, { ReactElement } from 'react'

const InvidualProduct = () => {
  const { data, isLoading } = useAllProductsQuery()

  return (
    <ProductLayout>
      <ProductDetails
        name="Aluminium Paint"
        price="$1500"
        rating={4}
        reviews="10"
        img="/assets/raleway.png"
        description="MSI CREATOR 17 A10SFS-240AU 17 UHD 4K HDR Thin Bezel Intel 10th Gen i7 10875H - RTX 2070 SUPER MAX Q - 16GB RAM - 1TB SSD NVME - Windows 10 PRO Laptop"
      />
      <div className="pt-12 w-full">
        <h2 className="font-poppins mb-4 font-semibold text-[22px] leading-[33px]">
          Related Products
        </h2>
        <div className="flex">
          {isLoading ? (
            <ProductSkeleton amount={5} className="lg:grid-cols-5" />
          ) : data && data.length > 0 ? (
            data
              .slice(0, 4)
              .map((product: IProduct) => (
                <ProductCard
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
