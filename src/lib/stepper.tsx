import IdUpload from '@/sections/IDUpload'
import IndividualIDValidation from '@/sections/IndvidualIdValidation'
import SignupSuccess from '@/sections/RegistrationSuccess'
import MechantIndividualRegistration from '@/ui/forms/MechantIndividualRegistration'

export const AuthIndividualStepper = {
  1: <MechantIndividualRegistration />,
  2: <MechantIndividualRegistration />,
  3: <SignupSuccess />,
}

export const IDValidationStepper = {
  1: <IndividualIDValidation />,
  2: <IdUpload />,
}