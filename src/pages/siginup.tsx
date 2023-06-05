import { RegistrationProp } from '@/interface/auth'
import MainLayout from '@/layouts/MainLAyout'
import Button from '@/ui/button/Button'
import Input from '@/ui/input/TextInput'
import { RegistrationSchema } from '@/validationschema/authSchema'
import { yupResolver } from '@hookform/resolvers/yup'
import dynamic from 'next/dynamic'
import React, { ReactElement } from 'react'
import { useForm } from 'react-hook-form'
const CountryCodeSelector = dynamic(
  () => import('../ui/input/PhoneCountryCodeInput'),
  {
    ssr: false,
  }
)

const BuyerSiginup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationProp>({
    resolver: yupResolver(RegistrationSchema),
  })

  const onSubmit = handleSubmit(async (info) => {
    console.log(info)
  })

  return (
    <div className="wrapper">
      <h1 className="pt-12 pb-8 w-full  font-semibold text-[32px] leading-[40px]">
        Customer Sign Up
      </h1>

      <div className="w-[580px] mx-auto mb-5 flex flex-col  p-6 min-h-[400px] bg-[#F5F9FF]">
        <form
          onSubmit={onSubmit}
          className="flex flex-col px-4 lg:px-0 items-center justify-center w-full pb-4"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-6 w-full">
            <Input
              title="First Name"
              name="firstname"
              type="text"
              placeholder="enter first name"
              error={errors}
              register={register}
            />
            <Input
              title="Last Name"
              name="lastname"
              type="text"
              placeholder="enter last name"
              register={register}
              error={errors}
            />
          </div>
          <Input
            title="Email Address"
            name="email"
            type="email"
            placeholder="enter email address"
            register={register}
            error={errors}
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
            title="Password"
            name="password"
            type="password"
            placeholder="*********"
            register={register}
            error={errors}
          />
          <div className="w-full flex items-end justify-end">
            <Button
              title="Crete account"
              classNames="w-[220px]  items-end justify-end  mt-4 mr-4 text-[14px] py-3 rounded-[50px]"
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default BuyerSiginup

BuyerSiginup.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>
}
