import MainLayout from '@/layouts/MainLAyout'
import ProductLayout from '@/layouts/ProdutLayout'
import ProductDetails from '@/sections/ProductDetails'
import React, { ReactElement } from 'react'

const InvidualProduct = () => {
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
    </ProductLayout>
  )
}

export default InvidualProduct
InvidualProduct.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>
}
