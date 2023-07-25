import { setCategotyId } from '@/redux/reducer/countryReducer'
import { useGetProductsCategoriesQuery } from '@/redux/services/merchant'
import { useTypedDispatch, useTypedSelector } from '@/redux/store'
import ListSkeleton from '@/ui/skeletonLoader/ListSkeleton'
// import { useRouter } from 'next/router'
import React, { useState } from 'react'

const ExploreFilter = ({ show }: { show: boolean }) => {
  const dispatch = useTypedDispatch()
  // const router = useRouter()
  const [expandCategory, setExpandCategory] = useState<boolean>(true)
  const toggle = () => setExpandCategory(!expandCategory)
  const { data, isLoading } = useGetProductsCategoriesQuery()
  // const [currentId, setCurrentId] = useState<string>('0')
  const { categoryId } = useTypedSelector((state) => state.dashboard)
  const setId = (id: string) => {
    dispatch(setCategotyId(id))
  }

  // useEffect(() => {
  //   dispatch(setCategotyId(router.query.id as string))
  //   setCurrentId(router.query.id as string)
  // }, [router.query.id, dispatch])

  return (
    <div
      className={`md:basis-[20%]  ${
        show ? 'absolute' : 'hidden'
      } md:block md:mr-[50px]`}
    >
      <h1 className="text-[28px] hidden md:block leading-[48px] font-poppins font-semibold">
        Market Place
      </h1>
      <div className="w-full bg-[#F5F7FF] py-3 px-6 mt-4 md:min-h-[80px]">
        <h2 className="w-full py-3 font-poppins font-[500] text-[16px] leading-[24px]">
          Filters
        </h2>
        <div className="w-full">
          <div className="w-full items-center justify-between flex">
            <h2 className="w-full py-3  font-[500] font-poppins text-[16px] leading-[24px]">
              Category
            </h2>
            <i
              className={`ri-arrow-drop-${
                expandCategory ? 'down' : 'right'
              }-line cursor-pointer text-[24px]`}
              onClick={toggle}
            ></i>
          </div>
          <div
            className={`flex flex-col ${
              expandCategory && 'h-[250px]'
            } overflow-y-scroll`}
          >
            {expandCategory && isLoading ? (
              <ListSkeleton />
            ) : (
              expandCategory &&
              data &&
              data.map((category, index) => {
                const active = category.value === categoryId
                return (
                  <span
                    key={index}
                    className={`block font-poppins text-[13px] leading-[31px] py-1 ${
                      active ? 'font-bold' : 'font-400'
                    } cursor-pointer hover:font-[600]`}
                    onClick={() => setId(category.value)}
                  >
                    {category.label}
                  </span>
                )
              })
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExploreFilter
