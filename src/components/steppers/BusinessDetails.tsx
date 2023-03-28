import { useAppDispatch, useAppSelector } from '@/hooks/useReducer'
import ModalWraper from '@/modals'
import EmailVerificationModal from '@/modals/EmailVerificationModal'
import React from 'react'
import Button from '../shared/Button'
import Input from '../shared/Input'
import { useForm } from 'react-hook-form'
import { BusinessAuthSchema } from '@/schema/auth/mechant'
import { yupResolver } from '@hookform/resolvers/yup'
import { Form2 } from '@/interface/IForm'
import { addInfo, incrementStepper } from '@/redux/reducers/step_reducer'

const BusinessDetails = () => {
  const dispatch = useAppDispatch()
  const { show } = useAppSelector((state) => state.modal)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form2>({
    resolver: yupResolver(BusinessAuthSchema),
  })

  const onSubmit = handleSubmit(async (info) => {
    console.log(info)
    dispatch(addInfo(info))
    dispatch(incrementStepper())
  })

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
      <form onSubmit={onSubmit} className="flex flex-col items-center">
        <Input
          title="Company name"
          name="business_name"
          type="text"
          error={errors}
          placeholder="enter business name"
          register={register}
        />
        <Input
          title="Company email"
          name="email"
          error={errors}
          type="email"
          placeholder="enter company email"
          register={register}
        />
        <Input
          title="Company phone number"
          name="phone"
          type="number"
          error={errors}
          placeholder="enter phone number"
          register={register}
        />
        <Input
          title="Website"
          name="website"
          type="text"
          error={errors}
          placeholder="enter website address"
          register={register}
        />
        <Input
          title="CAC registration number"
          name="cac_number"
          type="text"
          error={errors}
          placeholder="enter cac number"
          register={register}
        />

        <div className="flex items-end justify-end w-full mt-4">
          <Button title="Next" classNames="w-[205px] h-[50px] rounded-[50px]" />
        </div>
      </form>
    </>
  )
}

export default BusinessDetails
