import React from 'react'

const CreateHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-between w-full pt-10 pb-8 border-b mb-4 border-[#CCCCCC]">
      <>{children}</>
    </div>
  )
}

export default CreateHeader
