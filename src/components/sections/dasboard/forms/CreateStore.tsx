import React from 'react'
import Input from '@/components/shared/Input'
import { yupResolver } from '@hookform/resolvers/yup'
import { CreateStore } from '@/interface/dashboard'
import { storeSchema } from '@/schema/dashboard/store'
import { useForm } from 'react-hook-form'
import TextArea from '@/components/shared/TextArea'
import Select from '@/components/shared/Select'
import Button from '@/components/shared/Button'
import SearchInput from '@/components/shared/SearchInput'
import { useRouter } from 'next/router'
import { useAppSelector } from '@/hooks/useReducer'
import { useCreateStoreMutation } from '@/redux/reducers/strore_reducer'
import { AuthError } from '@/interface/errors'
import { toast } from 'react-toastify'

const CreateStore = () => {
  const router = useRouter()
  const { country, city } = useAppSelector((state) => state.dashboard)
  const [createStore, { isLoading }] = useCreateStoreMutation()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateStore>({
    resolver: yupResolver(storeSchema),
  })

  const onSubmit = handleSubmit(async (info) => {
    const data = { ...info, country_id: country.id.toString(), city }
    try {
      const response = await createStore(data).unwrap()
      console.log(response)
      router.push('/seller/dashboard/my-store')
    } catch (err) {
      console.log(err)
      const error = (err as AuthError).data.message
      toast.error(error)
    }
  })

  return (
    <form className="flex flex-col max-w-[600px] my-8" onSubmit={onSubmit}>
      <Input
        title="Store Name"
        placeholder="enter store name"
        type="text"
        name="name"
        register={register}
        error={errors}
      />
      <Select title="Location" />
      <SearchInput name="city" />

      <Input
        title="Address"
        placeholder="enter street address"
        type="text"
        name="address"
        register={register}
        error={errors}
      />
      <TextArea
        span
        title="Description"
        placeholder="enter store description"
        type="text"
        name="description"
        register={register}
        error={errors}
      />
      <Button
        title={isLoading ? 'Loading...' : 'Setup'}
        classNames="w-[210px] h-[50px] rounded-[50px] my-4"
      />
    </form>
  )
}

export default CreateStore
