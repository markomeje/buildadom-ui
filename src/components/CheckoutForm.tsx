import { BusinessMerchant } from '@/interface/form.interface'
import Button from '@/ui/button/Button'
import Input from '@/ui/input/TextInput'
import { BusinessAuthSchema } from '@/validationschema/authSchema'
import { yupResolver } from '@hookform/resolvers/yup'
import dynamic from 'next/dynamic'
import React from 'react'
import { useForm } from 'react-hook-form'
const CountryCodeSelector = dynamic(
  () => import('../ui/input/PhoneCountryCodeInput'),
  {
    ssr: false,
  }
)

const CheckoutForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BusinessMerchant>({
    resolver: yupResolver(BusinessAuthSchema),
  })
  const formSubmit = handleSubmit(async (info) => {
    console.log(info)
  })
  return (
    <div className="w-full basis-[65%] mr-10">
      <h1 className="font-poppins text-[18px]  leading-[36px] font-semibold pb-2 border-b border-[#CCCCCC]">
        Shipping Address
      </h1>
      <form className="flex flex-col w-[70%] py-4" onSubmit={formSubmit}>
        <Input
          title="Email Adress"
          name="email"
          type="text"
          error={errors}
          placeholder="enter email address"
          register={register}
        />
        <Input
          title="First Name"
          name="firstname"
          type="text"
          error={errors}
          placeholder="enter first name"
          register={register}
        />
        <Input
          title="Last Name"
          name="lastname"
          type="text"
          error={errors}
          placeholder="enter last name"
          register={register}
        />

        <CountryCodeSelector
          register={register}
          error={errors}
          title="Phone Number"
          name="phone"
          type="string"
          placeholder="enter phone number"
        />

        <Input
          title="Street Address"
          name="address"
          type="text"
          error={errors}
          placeholder="enter house address"
          register={register}
        />

        <Input
          title="City"
          name="city"
          type="text"
          error={errors}
          placeholder="enter city name"
          register={register}
        />
        <Input
          title="Company name"
          name="business_name"
          type="text"
          error={errors}
          placeholder="enter business name"
          register={register}
        />
        <Input
          title="Company name"
          name="business_name"
          type="text"
          error={errors}
          placeholder="enter business name"
          register={register}
        />
        <Input
          title="Company name"
          name="business_name"
          type="text"
          error={errors}
          placeholder="enter business name"
          register={register}
        />
        <Button
          title="Next"
          classNames="py-[10px] px-[54px] mt-5 w-[220px]  rounded-[52px] hover:font-semibold"
        />
      </form>
    </div>
  )
}

export default CheckoutForm
