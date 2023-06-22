import { AuthError } from '@/interface/error.interface'
import { IValidationForm } from '@/interface/form.interface'
import { setValidationErrors } from '@/redux/reducer/errorReducer'
import { incrementStepper } from '@/redux/reducer/stepperReducer'
import { useGetIDTypesQuery } from '@/redux/services/utility.slice'
import { useAddValidationMutation } from '@/redux/services/validation.service'
import { useTypedDispatch, useTypedSelector } from '@/redux/store'
import Button from '@/ui/button/Button'
import InputSelect from '@/ui/input/InputSelect'
import Select from '@/ui/input/Select'
import SelectCountryOfBirth from '@/ui/input/SelectCountryofBirth'
import Input from '@/ui/input/TextInput'
import { IndividualIDValidationSchema } from '@/validationschema/storeScema'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

const IndividualIDValidation = () => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<IValidationForm>({
    resolver: yupResolver(IndividualIDValidationSchema),
  })

  const dispatch = useTypedDispatch()
  const [addValidation, { isLoading }] = useAddValidationMutation()
  const { userDetails } = useTypedSelector((state) => state.authToken)
  const { birth_country, country } = useTypedSelector(
    (state) => state.dashboard
  )

  const { data } = useGetIDTypesQuery()

  useEffect(() => {
    if (userDetails) {
      setValue('is_business', userDetails.type === 'business' ? true : false)
    }
  }, [userDetails, setValue])

  const onSubmit = handleSubmit(async (info) => {
    try {
      const res = await addValidation({
        ...info,
        birth_country: birth_country.id,
        citizenship_country: country.id,
        type: userDetails && userDetails.type,
      }).unwrap()
      if (res) {
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
      {userDetails && userDetails.type === 'business' && (
        <Input
          title="Full name"
          name="fullname"
          type="text"
          placeholder="enter full name"
          error={errors}
          register={register}
        />
      )}

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
          type="date"
          placeholder="13/12/2001"
          error={errors}
          register={register}
        />
      </div>

      {userDetails && userDetails.type === 'business' && (
        <>
          <Select title="Country of citizenship" />
          <SelectCountryOfBirth title="Country of birth" />
          <Input
            title="State"
            name="state"
            type="text"
            placeholder="enter state"
            error={errors}
            register={register}
          />
        </>
      )}

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
        type="date"
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
