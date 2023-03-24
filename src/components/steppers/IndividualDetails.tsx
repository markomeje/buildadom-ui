import { useAppDispatch, useAppSelector } from '@/hooks/useReducer'
import ModalWraper from '@/modals'
import EmailVerificationModal from '@/modals/EmailVerificationModal'
import { openModal } from '@/redux/reducers/modal_reducer'
import React from 'react'
import Button from '../shared/Button'
import Input from '../shared/Input'

const IndividualDetails = () => {
  const dispatch = useAppDispatch()
  const { show } = useAppSelector((state) => state.modal)
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    dispatch(openModal())
  }

  return (
    <>
      {show && (
        <ModalWraper>
          <EmailVerificationModal />
        </ModalWraper>
      )}
      <span className="font-poppins  text-[18px] my-6 mx-auto max-w-[446px] leading-[27px] text-center">
        Kindly provide all the following details to help us set up your store.
      </span>
      <form onSubmit={handleSubmit} className="flex flex-col  items-center">
        <div className="grid grid-cols-2 gap-x-6 w-full">
          <Input
            title="First Name"
            name="first_name"
            type="text"
            placeholder="enter first name"
          />
          <Input
            title="Last Name"
            name="last_name"
            type="text"
            placeholder="enter last name"
          />
        </div>
        <Input
          title="Email Address"
          name="email"
          type="email"
          placeholder="enter email address"
        />
        <Input
          title="Phone Number"
          name="phone_number"
          type="text"
          placeholder="enter phone number"
        />
        <Input
          title="Password"
          name="password"
          type="password"
          placeholder="*********"
        />

        <div className="flex items-end justify-end w-full mt-4">
          <Button title="Next" classNames="w-[205px] h-[50px] rounded-[50px]" />
        </div>
      </form>
    </>
  )
}

export default IndividualDetails
