import Input from '@/ui/input/TextInput'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import React from 'react'
import { IBank } from '@/interface/form.interface'
import { BankSchema } from '@/validationschema/bankSchema'

const AccountSetupModal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IBank>({
    resolver: yupResolver(BankSchema),
  })

  const onSubmit = handleSubmit(async (info) => {
    console.log(info)
  })

  return (
    <div className="flex flex-col w-full h-full z-50 max-w-[500px] py-[20px] justify-center">
      <form onSubmit={onSubmit}>
        <Input
          title="Enter Account Name"
          placeholder="Account Name"
          type="text"
          name="accountName"
          register={register}
          error={errors}
        />
        <Input
          title="Enter Account Number"
          placeholder="Account Number"
          type="text"
          name="accountNumber"
          register={register}
          error={errors}
        />
        <Input
          title="Product Name"
          placeholder="enter product name"
          type="text"
          name="name"
          register={register}
          error={errors}
        />
      </form>
    </div>
  )
}

export default AccountSetupModal
