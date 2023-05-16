import AddProductModal from '@/modals/AddProductWrapper'
import AdminVerification from '@/modals/AdminVerification'
import ProductUpload from '@/modals/ProductUpload'
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
  3: <AdminVerification />,
}

export const AddProduct = {
  1: <AddProductModal />,
  2: <ProductUpload />,
}
