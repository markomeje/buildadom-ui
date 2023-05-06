import React from 'react'
import Switch from 'react-switch'

interface IProps {
  loading: boolean
  isPublished: boolean
  publishAction: () => void
}

const PublishAction = ({ loading, isPublished, publishAction }: IProps) => {
  return (
    <div className="flex flex-col  items-end">
      <span className="block font-poppins mb-3 font-[600] w-[200px] text-[14px] text-right">
        {loading
          ? 'publishing...'
          : isPublished
          ? 'Toggle to unpublish your product on marketplace'
          : 'Toggle to publish your product on marketplace'}
      </span>
      <Switch onChange={publishAction} checked={isPublished} />
    </div>
  )
}

export default PublishAction
