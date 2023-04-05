import IndividualAuthForm from '../sections/dasboard/auth/forms/IndividualAuthForm'
import IndividualIDValidation from '../sections/dasboard/auth/forms/IndividualIDValidation'
import BusinessDetails from './BusinessDetails'
import IdUpload from './IdUpload'
import Personal from './Personal'

export const AuthStepper = {
  1: <BusinessDetails />,
  2: <Personal />,
}

export const AuthIndividualStepper = {
  1: <IndividualAuthForm />,
  2: <IndividualAuthForm />,
}

export const IDValidationStepper = {
  1: <IndividualIDValidation />,
  2: <IdUpload />,
}
