import { AuthError } from '@/interface/error.interface'
import { IValidationForm } from '@/interface/form.interface'
import { setValidationErrors } from '@/redux/reducer/errorReducer'
import { incrementStepper } from '@/redux/reducer/stepperReducer'
import { useGetIDTypesQuery } from '@/redux/services/utility.slice'
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
  const { data } = useGetIDTypesQuery()
  const onSubmit = handleSubmit(async (info) => {
    try {
      const res = await addValidation({ ...info, type: 'individual' }).unwrap()
      if (res) {
        console.log(res)
        toast.success('ID data updated successfully, upload ID')
        dispatch(incrementStepper())
      }
    } catch (err) {
      if ((err as AuthError).data?.errors) {
        dispatch(setValidationErrors((err as AuthError).data.errors))
      }
    }
  })

  return (
    <form onSubmit={onSubmit} className="flex flex-col  items-center">
      <h1 className="font-poppins font-semibold leading-[60px] pb-4 text-center text-[32px] text-bd-black">
        Merchant ID Validation
      </h1>
      <InputSelect
        data={data}
        control={control}
        errors={errors}
        label="ID Type"
        name="id_type"
      />
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
