import { AuthError } from '@/interface/error.interface'
import { IValidationForm } from '@/interface/form.interface'
import { incrementStepper } from '@/redux/reducer/stepperReducer'
import { useAddValidationMutation } from '@/redux/services/validation.service'
import { useTypedDispatch } from '@/redux/store'
import Button from '@/ui/button/Button'
import InputSelect from '@/ui/input/InputSelect'
import Input from '@/ui/input/TextInput'
import { IndividualIDValidationSchema } from '@/validationschema/storeScema'
import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

const IndividualIDValidation = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IValidationForm>({
    resolver: yupResolver(IndividualIDValidationSchema),
  })

  const dispatch = useTypedDispatch()
  const [addValidation, { isLoading }] = useAddValidationMutation()
  const onSubmit = handleSubmit(async (info) => {
    try {
      const res = await addValidation({...info, type: 'individual'}).unwrap()
      if (res) {
        // router.push('/seller/dashboard/create-store')
        dispatch(incrementStepper())
      }
    } catch (err) {
      console.log(err, 'eroror')
      if ((err as AuthError).data?.errors) {
        for (const value of Object.values((err as AuthError).data?.errors)) {
          toast.error(value[0])
        }
      }
    }
  })

  return (
    <form onSubmit={onSubmit} className="flex flex-col  items-center">
      <InputSelect control={control} errors={errors} />
      <div className="grid grid-cols-2 gap-x-6 w-full">
        <Input
          title="ID number"
          name="id_number"
          type="text"
          placeholder="enter id number"
          error={errors}
          register={register}
        />
        <Input
          title="Expiry Date"
          name="expiry_date"
          type="text"
          placeholder="13/12/2001"
          error={errors}
          register={register}
        />
      </div>
      <Input
        title="Address"
        name="address"
        type="text"
        placeholder="enter address"
        error={errors}
        register={register}
      />
      <Input
        title="Date of birth"
        name="dob"
        type="text"
        placeholder="13/12/2001"
        error={errors}
        register={register}
      />
      <Button
        title={isLoading ? 'Loading...' : 'Next'}
        classNames="w-full h-[50px] rounded-[50px] my-4 "
      />
    </form>
  )
}

export default IndividualIDValidation
