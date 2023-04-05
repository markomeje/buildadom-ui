import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'

const PhoneInputs = () => {
  const {
    // handleSubmit,
    formState: { errors },
    control,
  } = useForm()

  // const onSubmit = (data) => {
  //   console.log(data)
  // }

  return (
    // <form onSubmit={handleSubmit(onSubmit)} className="user-info-form">
    <div>
      <label htmlFor="phone-input">Phone Number</label>
      <Controller
        name="phone-input"
        control={control}
        rules={{
          validate: (value) => isValidPhoneNumber(value),
        }}
        render={({ field: { onChange, value } }) => (
          <PhoneInput
            value={value}
            onChange={onChange}
            defaultCountry="TH"
            id="phone-input"
          />
        )}
      />
      {errors['phone-input'] && <p className="error-message">Invalid Phone</p>}
    </div>
    // </form>
  )
}

export default PhoneInputs
