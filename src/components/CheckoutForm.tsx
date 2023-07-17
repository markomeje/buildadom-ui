import { IShippingDetails } from '@/interface/form.interface'
import { setShippingPrice } from '@/redux/reducer/stepperReducer'
import { useCreateShippingMutation } from '@/redux/services/buyer.service'
import { useTypedDispatch, useTypedSelector } from '@/redux/store'
import Button from '@/ui/button/Button'
import Select from '@/ui/input/Select'
import SearchCity from '@/ui/input/SelectCity'
import SearchInput from '@/ui/input/SelectInput'
import Input from '@/ui/input/TextInput'
import { ShippingSchema } from '@/validationschema/authSchema'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
// import dynamic from 'next/dynamic'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
// const CountryCodeSelector = dynamic(
//   () => import('../ui/input/PhoneCountryCodeInput'),
//   {
//     ssr: false,
//   }
// )

const PersonalInfo = ({
  title,
  content,
}: {
  title: string
  content: string
}) => {
  return (
    <div className="flex flex-col py-1">
      <p
        className={`font-poppins mb-1 text-[#333333] font-[500] leading-[27px] text-[14px]`}
      >
        {title}
      </p>
      <p className="font-poppins text-[13px] text-gray-500 leading-[20px]">
        {content}
      </p>
    </div>
  )
}

const CheckoutForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IShippingDetails>({
    resolver: yupResolver(ShippingSchema),
  })
  const dispatch = useTypedDispatch()
  const router = useRouter()
  const { userDetails } = useTypedSelector((state) => state.authToken)
  const { country, state, city } = useTypedSelector((state) => state.dashboard)
  const [createShipping, { isLoading }] = useCreateShippingMutation()
  const formSubmit = handleSubmit(async (info) => {
    try {
      const shppingInfo = {
        ...info,
        country_id: country.id,
        city,
        state,
      }
      const response = await createShipping(shppingInfo).unwrap()
      dispatch(setShippingPrice(response))
      toast.success('shipping created successfully')
      router.push('/payment')
    } catch (error) {
      console.log(error)
    }
  })
  return (
    <div className="w-full basis-[65%] mr-10">
      <div className="flex flex-col">
        <h1 className="font-poppins text-[18px]  leading-[36px] font-semibold pb-2 border-b border-[#CCCCCC]">
          Personal Details
        </h1>
        <div className="py-3 flex flex-col">
          <PersonalInfo
            title="First Name"
            content={userDetails && userDetails.name.split(' ')[0]}
          />
          <PersonalInfo
            title="Last Name"
            content={userDetails && userDetails.name.split(' ')[1]}
          />
          <PersonalInfo
            title="Email Address"
            content={userDetails && userDetails.email}
          />
        </div>
      </div>
      <div className="pt-4">
        <h1 className="font-poppins text-[18px]  leading-[36px] font-semibold pb-2 border-b border-[#CCCCCC]">
          Shipping Details
        </h1>
        <form className="flex flex-col w-[70%] py-4" onSubmit={formSubmit}>
          <Select title="Selelct Country" />
          <SearchInput name="state" />
          <SearchCity name="city" />
          <Input
            title="Street Address"
            name="street_address"
            type="text"
            error={errors}
            placeholder="enter house address"
            register={register}
          />

          {/* <CountryCodeSelector
            register={register}
            error={errors}
            title="Phone Number"
            name="phone"
            type="text"
            placeholder="enter phone number"
          /> */}

          <Input
            title="Zip Code"
            name="zip_code"
            type="text"
            error={errors}
            placeholder="enter zip code"
            register={register}
          />

          <Button
            title={isLoading ? 'Loading...' : 'Next'}
            classNames="py-[10px] px-[54px] mt-5 w-[220px]  rounded-[52px] hover:font-semibold"
          />
        </form>
      </div>
    </div>
  )
}

export default CheckoutForm
