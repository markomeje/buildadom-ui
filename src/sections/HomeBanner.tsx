/* eslint-disable @next/next/no-img-element */
import Button from '@/ui/button/Button'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { bgImgs } from '@/util/backgroundImgs'

const HomeBanner = () => {
  const [current, setCurrent] = useState<number>(0)
  const settings = {
    className: 'center',
    autoplay: true,
    infinite: true,
    slidesToShow: 1,
    arrows: true,
    focusOnSelect: true,
    draggable: true,
    dots: true,
    autoplaySped: 2000,
    speed: 1000,
    afterChange: (current: number) => setCurrent(current),
    customPaging: (i: number) => (
      <div
        className={`w-[10px] -mt-8 h-[10px]  rounded-[10px] ${
          current === i ? 'bg-white' : 'bg-[#667085]'
        }`}
      ></div>
    ),
    responsive: [
      {
        breakpoint: 450,
        settings: {
          autoplay: true,
          centerMode: false,
          infinite: true,
          centerPadding: '60px',
          slidesToShow: 1,
          arrows: true,
          draggable: true,
          dots: true,
          autoplaySped: 1000,
          speed: 500,
          afterChange: (current: number) => setCurrent(current),
          customPaging: (i: number) => (
            <div
              className={`w-[10px] -mt-8 h-[10px]  rounded-[10px] ${
                current === i ? 'bg-white' : 'bg-[#667085]'
              }`}
            ></div>
          ),
        },
      },
    ],
  }
  const router = useRouter()
  const redirect = (link: string) => {
    router.push(link)
  }
  return (
    <div className="wrapper">
      <Slider {...settings}>
        {bgImgs.map((image, index) => {
          return (
            <div
              key={index}
              className="w-full cursor-pointer h-[60vh] lg:h-[310px] relative"
            >
              <img
                src={image}
                alt="carousel-img"
                className={`w-full h-full object-fit lg:px-0 flex flex-col justify-center items-center`}
              ></img>
              <div className="absolute top-0 left-0 right-0 flex flex-col items-center justify-center h-full">
                <h2 className="w-full lg:w-[501px] font-poppins font-semibold lg:leading-[48px] text-[32px] lg:text-[36px] text-white text-center mx-auto">
                  Bringing the market to the customer
                </h2>
                <div className="flex lg:flex-row w-full flex-col items-center mt-7 justify-center">
                  <Button
                    title="Buy from Buildadom"
                    classNames="bg-bd-blue mb-5 lg:mb-0 w-[280px] lg:w-[191px] h-[44px] mr-4 rounded-[50px] py-[8px] px-[26px] text-white font-poppins text-[13px]"
                  />
                  <button
                    className="bg-white font-semibold border-none text-bd-blue w-[280px] lg:w-[191px] h-[44px] rounded-[50px]  py-[8px] px-[26px] font-poppins text-[13px]"
                    onClick={() => redirect('/merchant')}
                  >
                    Sell On Buildadom
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </Slider>
    </div>
  )
}

export default HomeBanner
