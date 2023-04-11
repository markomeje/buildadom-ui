import Properties from '@/components/Property'
import React from 'react'

const Property = () => {
  return (
    <div className="flex min-h-[350px] h-full max-w-[1250px] mt-8 mx-auto justify-between items-center">
      <Properties
        title="Secured Transactions"
        content="We sincerely care about how you make your transactions and hence made it easier. Payments are guaranteed through an escrow account to ensure that all parties are happy and satisfied."
        bg="bg-[#FF35C5]"
        overlay="bg-[#EBBDDD]"
        icon="ri-heart-3-fill"
      />
      <Properties
        title="Trust and Quality"
        content="We are on a mission to transform Africa’s building and construction industry, every block we lay lies on a foundation of trust. Quality assurance and delivery is at the heart of everything we do. "
        bg="bg-[#0156FF]"
        overlay="bg-[#0156ff66]"
        icon="ri-caravan-fill"
      />
      <Properties
        title="Growth"
        content="We are on a journey to grow Africa’s digital economy and we want your business to be part of this growth. Therefore, we would be continuously working hard to provide digital solutions and support you with tools that will enable growth. "
        bg="bg-[#FFA500]"
        overlay="bg-[#ffb80066]"
        icon="ri-global-fill"
      />
    </div>
  )
}

export default Property
