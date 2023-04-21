import React from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { AuthError } from '@/interface/error.interface'
import Button from '@/ui/button/Button'
import { useTypedSelector } from '@/redux/store'
import { useCreateStoreMutation } from '@/redux/services/store.slice'
import SearchInput from '@/ui/input/SelectInput'
import Input from '@/ui/input/TextInput'
import TextArea from '@/ui/input/TextArea'
import Select from '@/ui/input/Select'
import { CreateStore } from '@/interface/general.interface'
import { storeSchema } from '@/validationschema/storeScema'

const CreateStore = () => {
  const router = useRouter()
  const { country, city } = useTypedSelector((state) => state.dashboard)
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
      router.push('/dashboard')
    } catch (err) {
      const error = (err as AuthError).data.errors
        ? (err as AuthError).data.errors.name[0]
        : (err as AuthError).data.message
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
