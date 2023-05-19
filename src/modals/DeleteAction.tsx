/* eslint-disable @next/next/no-img-element */
import { useDeleteDriverMutation } from '@/redux/services/drivers.service'
import Button from '@/ui/button/Button'
import React from 'react'
import { toast } from 'react-toastify'

const DeleteAction = ({ id }: { id: number }) => {
  const [deleteDriver, { isLoading }] = useDeleteDriverMutation()

  const handleDelete = async (id: number) => {
    try {
      const response = await deleteDriver({ id }).unwrap()
      toast.error(response)
    } catch (error) {
      console.log(error, 'errP')
    }
  }
  return (
    <div className="flex flex-col py-8 items-center justify-center">
      <img
        src="/assets/danger.png"
        alt="verify_logo"
        className="w-[60px] h-[60px]"
      />
      <h1 className="text-[20px]  font-poppins py-2">Are you sure of this ?</h1>
      <div className="flex items-center">
        <Button
          onClick={() => handleDelete(id)}
          title={isLoading ? 'Deleting...' : 'Delete'}
          classNames="text-red-500 bg-red-500 px-8 mt-3 py-3 rounded-[3px]"
        />
      </div>
    </div>
  )
}

export default DeleteAction
