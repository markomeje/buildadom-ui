import { useAppDispatch } from '@/hooks/useReducer'
import { incrementStepper } from '@/redux/reducers/step_reducer'
import React from 'react'
import Button from '../shared/Button'
import Input from '../shared/Input'

const Personal = () => {
  const dispatch = useAppDispatch()
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    dispatch(incrementStepper())
  }
  return (
    <>
      <span className="font-poppins  text-[18px] my-6 mx-auto max-w-[446px] leading-[27px] text-center">
        Kindly provide all the following details to help us set up your store.
      </span>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <div className="grid grid-cols-2 gap-x-6 w-full">
          <Input
            title="Full Name"
            name="full_name"
            type="text"
            placeholder="enter full name"
          />
          <Input
            title="Business Name"
            name="business_name"
            type="text"
            placeholder="enter business name"
          />
        </div>
        <Input
          title="Business Email"
          name="business_email"
          type="email"
          placeholder="enter business email"
        />
        <Input
          title="Phone Number"
          name="phone_number"
          type="text"
          placeholder="enter phone number"
        />
        <Input
          title="Location"
          name="location"
          type="text"
          placeholder="enter business location"
        />
        <Input
          title="Business Name"
          name="business_name"
          type="text"
          placeholder="enter business name"
        />
        <Input
          title="What kind of building materials do you sell"
          name="business_type"
          type="text"
          placeholder="business type"
        />
        <div className="flex items-end justify-end w-full mt-4">
          <Button title="Next" classNames="w-[205px] h-[50px] rounded-[50px]" />
        </div>
      </form>
    </>
  )
}

export default Personal
