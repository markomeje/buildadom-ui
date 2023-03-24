import { useAppDispatch, useAppSelector } from '@/hooks/useReducer'
import ModalWraper from '@/modals'
import EmailVerificationModal from '@/modals/EmailVerificationModal'
import { openModal } from '@/redux/reducers/modal_reducer'
import React from 'react'
import Button from '../shared/Button'
import Input from '../shared/Input'

const BusinessDetails = () => {
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
        ID/Business Verification
      </span>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <Input
          title="Company name"
          name="company_name"
          type="text"
          placeholder="enter first name"
        />
        <Input
          title="Company address"
          name="company_address"
          type="text"
          placeholder="enter company address"
        />
        <Input
          title="Company email"
          name="company_email"
          type="text"
          placeholder="enter company email"
        />
        <Input
          title="Company phone number"
          name="company_number"
          type="number"
          placeholder="enter phone number"
        />
        <Input
          title="Website"
          name="website"
          type="text"
          placeholder="enter site address"
        />
        <Input
          title="CAC registration number"
          name="cac_reg_number"
          type="text"
          placeholder="enter CAC number"
        />
        <div className="flex items-end justify-end w-full mt-4">
          <Button title="Next" classNames="w-[205px] h-[50px] rounded-[50px]" />
        </div>
      </form>
    </>
  )
}

export default BusinessDetails
