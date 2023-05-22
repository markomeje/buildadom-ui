import ModalWraper from '@/modals'
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
import dynamic from 'next/dynamic'
import { setValidationErrors } from '@/redux/reducer/errorReducer'
import { rules } from '@/util/info'
import UseStepper from '@/hooks/useStepper'
import { VerificationStepper } from '@/lib/stepper'
const CountryCodeSelector = dynamic(
  () => import('../ui/input/PhoneCountryCodeInput'),
  {
    ssr: false,
  }
)

const BusinessDetails = () => {
  const dispatch = useTypedDispatch()
  const { show } = useTypedSelector((state) => state.modal)
  const [addUser, { isLoading }] = useAdduserMutation()
  const { countryCode } = useTypedSelector((state) => state.dashboard)

  const { step } = useTypedSelector((state) => state.stepper)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BusinessMerchant>({
    resolver: yupResolver(BusinessAuthSchema),
  })

  const onSubmit = handleSubmit(async (info) => {
    const formData = {
      ...info,
      phone: countryCode.dial_code + info.phone,
      type: 'business',
    }
    try {
      await addUser(formData).unwrap()
      dispatch(openModal())
    } catch (err) {
      if ((err as AuthError).data?.errors) {
        dispatch(setValidationErrors((err as AuthError).data.errors))
      }
    }
  })

  return (
    <>
      {show && (
        <ModalWraper>
          <UseStepper step={step} stepObject={VerificationStepper} />
        </ModalWraper>
      )}
      <span className="font-poppins  text-[18px] my-6 mx-auto max-w-[446px] leading-[27px] text-center">
        ID/Business Verification
      </span>
      <form
        onSubmit={onSubmit}
        className="flex px-4 lg:px-0 flex-col items-center"
      >
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

        <CountryCodeSelector
          register={register}
          error={errors}
          title="Phone Number"
          name="phone"
          type="number"
          placeholder="enter phone number"
        />
        <Input
          title="Website"
          name="website"
          isStar={false}
          type="text"
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
          rules={rules}
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
        <div className="flex lg:items-end lg:justify-end w-full mt-4">
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
