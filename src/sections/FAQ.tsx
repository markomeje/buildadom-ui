import React, { useState } from 'react'

const FAQ = () => {
  return (
    <div className="min-h-[450px] pt-8 px-4 md:px -0 md:pt-12 pb-6 flex flex-col items-center justify-center">
      <h1 className="font-poppins font-semibold text-[44px] leading-[130px]">
        FAQs
      </h1>
      <div className="flex items-center flex-col w-full justify-center max-w-[920px] mx-auto">
        <Question
          text="How to get started?"
          content="To get started, you must sign up as a merchant on the Buildadom website, verify your phone number and email, verify your ID, create a store, add products, and publish your store. "
        />
        <Question
          text="How to sell on House Depot"
          content="To sell on Buildadom, you must create a merchant account and set up your store."
        />
        <Question
          text="How to apply for adverts"
          content="Contact the Buildadom customer support phone number or email provided to discuss advert deals."
        />
        <Question
          text="What is Escrow Account"
          content="An Escrow Account is a financial arrangement used in e-commerce transactions to ensure secure and trustworthy exchanges between buyers and sellers. It acts as a neutral third-party holding funds until both parties fulfil their obligations in the transaction."
        />
        <Question
          text="How does Escrow Account work on Buildadom?"
          content="When buyers order a product from the marketplace, they submit payment to the Escrow Account, which verifies the funds. Once the funds are verified, the seller is notified to deliver the goods or services. The buyer then receives the products or services and confirms their satisfaction. Once the buyer confirms their satisfaction, the funds in the Escrow Account are released to the seller. This process ensures a secure and fair transaction for both parties."
        />
        <Question
          text="Must I publish my store?"
          content="When buyers order a product from the marketplace, they submit payment to the Escrow Account, which verifies the funds. Once the funds are verified, the seller is notified to deliver the goods or services. The buyer then receives the products or services and confirms their satisfaction. Once the buyer confirms their satisfaction, the funds in the Escrow Account are released to the seller. This process ensures a secure and fair transaction for both parties."
        />
      </div>
    </div>
  )
}

export default FAQ

const Question = ({ text, content }: { text: string; content: string }) => {
  const [show, setShow] = useState<boolean>(false)
  const handleToggle = () => {
    setShow(!show)
  }
  return (
    <div
      className={`w-full flex flex-col mb-6 cursor-pointer lg:shadow duration-500 items-center justify-between pl-[26px]  border border-[#CCCCCC] pr-[28px]`}
      onClick={handleToggle}
    >
      <div className="flex min-h-[74px] items-center justify-between w-full">
        <h2 className="font-[600] font-poppins text-[15px] lg:text-[22px] leading-[32px] text-[#313131]">
          {text}
        </h2>
        <i
          className={`ri-arrow-${show ? 'down' : 'right'}-s-line text-[20px]`}
        ></i>
      </div>
      <div
        className={`${
          show ? 'min-h-[146px] py-4 border-t border-[#ababab36]' : 'h-0'
        } flex  w-full items-center  justify-center duration-300`}
      >
        <span
          className={`${
            show ? 'block' : 'hidden'
          } font-poppins text-[15px] md:text-[18px] leading-[29px] text-[#2B2B2B]`}
        >
          {content}
        </span>
      </div>
    </div>
  )
}
