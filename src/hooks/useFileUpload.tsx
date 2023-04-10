import { useImageUploadMutation } from '@/redux/services/validation.service';
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

function useFileUpload() {
  const router = useRouter();
  const [imageUpload, { isLoading:fileLoading, isError }] = useImageUploadMutation()
    const uploadFile = async (file:File, id: string, modelType:string, role:string) => {
    if (!file) return toast.error('select a file')
    const formData = new FormData()
    formData.append('model', modelType)
    formData.append('model_id', id) 
    formData.append('role', role)
    formData.append('image', file)

    try {
      const response = await imageUpload(formData)
      if (response) toast.success('ID uploaded successfully')
      router.push('/dashboard')
    } catch (error) {
      console.log(error)
    }
  }
  return [uploadFile, fileLoading, isError]
}

export default useFileUpload
