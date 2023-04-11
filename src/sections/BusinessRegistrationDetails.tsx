import ModalWraper from '@/modals'
import EmailVerificationModal from '@/modals/EmailVerificationModal'
import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Input from '@/ui/input/TextInput'
import Button from '@/ui/button/Button'
import { useTypedDispatch, useTypedSelector } from '@/redux/store'
import { BusinessAuthSchema } from '@/validationschema/authSchema'
import { BusinessMerchant } from '@/interface/form.interface'
import { openModal } from '@/redux/reducer/modalReducer'
import { useAdduserMutation } from '@/redux/services/auth.service'
import { AuthError } from '@/interface/error.interface'
import { toast } from 'react-toastify'

const BusinessDetails = () => {
  const dispatch = useTypedDispatch()
  const { show } = useTypedSelector((state) => state.modal)
  const [addUser, { isLoading }] = useAdduserMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BusinessMerchant>({
    resolver: yupResolver(BusinessAuthSchema),
  })

  const onSubmit = handleSubmit(async (info) => {
    const result = { ...info, type: 'business' }
    try {
      await addUser(result).unwrap()
      dispatch(openModal())
    } catch (err) {
      if ((err as AuthError).data?.errors) {
        for (const value of Object.values((err as AuthError).data?.errors)) {
          toast.error(value[0])
        }
      }
      console.log(err)
    }
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
        <Input
          title="Address"
          name="address"
          type="text"
          placeholder="enter address"
          register={register}
          error={errors}
        />
        <Input
          title="Password"
          name="password"
          type="password"
          placeholder="*********"
          register={register}
          error={errors}
        />

        <Input
          title="Confirm Password"
          name="confirm_password"
          type="password"
          placeholder="*********"
          register={register}
          error={errors}
        />
        <div className="flex items-end justify-end w-full mt-4">
          <Button
            title={`${isLoading ? 'Loading...' : 'Submit'}`}
            classNames="w-[205px] h-[50px] rounded-[50px]"
          />
        </div>
      </form>
    </>
  )
}

export default BusinessDetails
