import React from 'react'
import Switch from 'react-switch'

interface IProps {
  loading: boolean
  isPublished: boolean
  isError: boolean
  publishAction: () => void
}

const PublishAction = ({
  loading,
  isPublished,
  publishAction,
  isError,
}: IProps) => {
  return (
    <div
      className={`${
        isError ? 'hidden' : 'flex absolute lg:relative'
      }   right-4 lg:flex-col flex-col-reverse top-0  lg:pt-0 pt-8  items-end`}
    >
      {/* <span className="hidden lg:block font-poppins mb-3 font-[600] w-[200px] text-[14px] lg:text-right">
        {loading && 'publishing...'}
      </span> */}

      <span className="block  font-poppins mb-2 font-[500]  text-[14px] lg:text-right">
        {loading ? 'publishing...' : isPublished ? 'unpublish' : 'publish'}
      </span>
      <Switch onChange={publishAction} checked={isPublished} />
    </div>
  )
}

export default PublishAction

// : isPublished
//           ? 'Toggle to unpublish your product on marketplace'
//           : 'Toggle to publish your product on marketplace'
