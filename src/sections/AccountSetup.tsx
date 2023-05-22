import Input from '@/ui/input/TextInput'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import React, { useEffect } from 'react'
import { IBank } from '@/interface/form.interface'
import { BankSchema } from '@/validationschema/bankSchema'
import Button from '@/ui/button/Button'
import {
  useAddAccountDetailsMutation,
  useGetAccountInfoQuery,
  useGetBanksQuery,
} from '@/redux/services/account.service'
import InputSelect from '@/ui/input/InputSelect'
import { toast } from 'react-toastify'
import { useTypedDispatch } from '@/redux/store'
import { AuthError } from '@/interface/errors'
import { setValidationErrors } from '@/redux/reducer/errorReducer'

const AccountSetupModal = ({ edit }: { edit: () => void }) => {
  const { data } = useGetBanksQuery()
  const { data: info, isLoading: fetching } = useGetAccountInfoQuery()

  const dispatch = useTypedDispatch()
  const [addAccountDetails, { isLoading }] = useAddAccountDetailsMutation()
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<IBank>({
    resolver: yupResolver(BankSchema),
  })

  useEffect(() => {
    if (info && !fetching) {
      setValue('account_name', info.account_name)
      setValue('account_number', info.account_number)
      setValue('bank', info.bank)
    }
  }, [info, setValue, fetching])

  const onSubmit = handleSubmit(async (info) => {
    try {
      const result = await addAccountDetails(info).unwrap()
      toast.success(result)
      edit()
    } catch (err) {
      if ((err as AuthError).data?.errors) {
        dispatch(setValidationErrors((err as AuthError).data.errors))
      }
    }
  })

  return (
    <div className="flex flex-col w-full h-full z-50 max-w-[90%]  lg:max-w-[500px] py-[20px] justify-center">
      <form onSubmit={onSubmit}>
        <Input
          title="Enter Account Name"
          placeholder="Account Name"
          type="text"
          name="account_name"
          register={register}
          error={errors}
        />
        <Input
          title="Enter Account Number"
          placeholder="Account Number"
          type="text"
          name="account_number"
          register={register}
          error={errors}
        />
        <InputSelect
          data={data}
          control={control}
          errors={errors}
          label="Enter Bank Name"
          name="bank"
        />
        <Button
          title={isLoading ? 'Loading...' : 'Save'}
          classNames="w-full h-[50px] rounded-[50px] my-4 "
        />
      </form>
    </div>
  )
}

export default AccountSetupModal
