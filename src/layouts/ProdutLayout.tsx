/* eslint-disable @next/next/no-img-element */
import ExploreFilter from '@/components/ExploreFilter'
import { setDisplayType } from '@/redux/reducer/modalReducer'
import { useTypedDispatch } from '@/redux/store'
// import Button from '@/ui/button/Button'
import ExploreSearch from '@/ui/input/MarketSearch'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

export const DropSearch = ({
  header,
  text,
}: {
  header: string
  text: string
}) => {
  return (
    <div className="min-w-[176px] mr-2 h-[50px] flex items-center justify-center border-[2px] border-[#CCCCCC] rounded-[2px]">
      <b className="text-[13px] font-semibold font-poppins">{header}</b>{' '}
      <span className="text-[14px] font-[500] font-poppins">{text}</span>
      <i className="ri-arrow-drop-right-line"></i>
    </div>
  )
}
const ProductLayout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useTypedDispatch()
  const router = useRouter()
  const id = router.query.id
  const setDisplay = (type: string) => {
    dispatch(setDisplayType(type))
  }
  const [showFilter, setShowFilter] = useState(false)
  const toggleFilter = () => {
    setShowFilter(!showFilter)
  }
  return (
    <div className="mt-4 lg:mt-12 wrapper w-full pb-12">
      <div className="flex w-full px-4 lg:px-0 pb-8 lg:pb-16 justify-end items-end">
        <ExploreSearch />
      </div>
      <div className="flex items-center lg:hidden px-5 justify-end">
        <i className="ri-menu-2-fill  text-[25px] text-gray-700 mr-2"></i>
        <i className="ri-grid-fill text-[25px] text-gray-700 mr-2"></i>
        <i
          className="ri-filter-line text-[25px] text-gray-700 mr-2"
          onClick={toggleFilter}
        ></i>
      </div>
      <div className="md:my-3 w-full sticky  flex">
        <ExploreFilter show={showFilter} />
        <div className="w-full px-4">
          {!id && (
            <div className="items-center hidden lg:flex">
              <DropSearch header="Sort By:" text="All" />
              <DropSearch header="Sort By:" text="All" />
              <div className="flex w-full justify-between">
                <div className="flex  ml-8 items-center">
                  <img
                    src="/assets/sidebar.png"
                    className="mr-3  cursor-pointer"
                    alt=""
                    onClick={() => setDisplay('grid')}
                  />
                  <img
                    src="/assets/bars.png"
                    className="cursor-pointer"
                    alt=""
                    onClick={() => setDisplay('list')}
                  />
                </div>
              </div>
            </div>
          )}
          <div className="w-full my-8">{children}</div>
        </div>
      </div>
    </div>
  )
}

export default ProductLayout
