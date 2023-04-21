import ExploreFilter from '@/components/ExploreFilter'
// import ExploreProducts from '@/components/ExploreProducts'
import MainLayout from '@/layouts/MainLAyout'
import ExploreSearch from '@/ui/input/MarketSearch'
import React, { ReactElement } from 'react'

const Explore = () => {
  return (
    <div className="mt-12 wrapper w-full pb-12">
      <div className="flex w-full  justify-end items-end">
        <ExploreSearch />
      </div>
      <div className="my-8 flex">
        <ExploreFilter />
        {/* <ExploreProducts /> */}
      </div>
    </div>
  )
}

export default Explore

Explore.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>
}
