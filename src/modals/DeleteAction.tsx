/* eslint-disable @next/next/no-img-element */
import { useDeleteDriverMutation } from '@/redux/services/drivers.service'
import React from 'react'
import { toast } from 'react-toastify'

const DeleteAction = ({ id }: { id: number }) => {
  const [deleteDriver, { isLoading }] = useDeleteDriverMutation()

  const handleDelete = async (id: number) => {
    try {
      const response = await deleteDriver({ id }).unwrap()
      toast.error(response)
    } catch (error) {
      toast.error('Error deleting driver')
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
        <button
          onClick={() => handleDelete(id)}
          className="bg-red-500 px-8 mt-3 font-poppins text-white py-3 rounded-[3px]"
        >
          {isLoading ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </div>
  )
}

export default DeleteAction
