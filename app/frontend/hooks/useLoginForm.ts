import { useState } from "react"
import type { SignInFormData, SignInFormErrors } from "@/types/auth"
import useFormState from "@/hooks/useFormState"
import useApiSubmit from "@/hooks/useApiSubmit"
import useCsrfToken from "@/hooks/useCsrfToken"

const useLoginForm = () => {
  const { formData, errors, handleChange, setFieldError, clearErrors } = useFormState<
         SignInFormData,
         SignInFormErrors
       >({
         email: '',
         password: '',
         rememberMe: false,
       })
  
  const { submit, loading } = useApiSubmit()
  const [showPassword, setShowPassword] = useState(false)
  const csrfToken = useCsrfToken()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    clearErrors()

    try {
      const data = new FormData()
      data.append("user[email]", formData.email)
      data.append("user[password]", formData.password)
      if (formData.rememberMe) {
        data.append("user[remember_me]", "1")
      }
      data.append("authenticity_token", csrfToken)

      const response = await submit("/api/v1/auth/sign_in", data)

      if (response.ok) {
        window.location.href = "/admin/"
      } else {
        setFieldError("general", "メールアドレスまたはパスワードが正しくありません")
      }
    } catch (error) {
      setFieldError("general", "ネットワークエラーが発生しました")
    }
  }

  return {
    formData,
    errors,
    handleChange,
    handleSubmit,
    loading,
    showPassword,
    setShowPassword,
  }
}

export default useLoginForm
