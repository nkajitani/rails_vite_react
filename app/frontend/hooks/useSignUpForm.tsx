import useFormState from "@/hooks/useFormState"
import type { SignUpFormData, SignUpFormErrors, SignUpResponse } from "@/types/auth"
import { SignUpFieldLabels } from "@/types/auth"
import useApiSubmit from "./useApiSubmit"
import useCsrfToken from "./useCsrfToken"
import { useState } from "react"
import { serverToFrontKey } from "@/utils/stringUtils"
import { useNavigate } from 'react-router-dom'

const useSignUpform = () => {
  const navigate = useNavigate()
  const { formData, errors, handleChange, setFieldError, clearErrors } = useFormState<
          SignUpFormData,
          SignUpFormErrors
        >({
          name: '',
          email: '',
          password: '',
          passwordConfirmation: '',
        })

  const { submit, loading } = useApiSubmit()
  const [showPassword, setShowPassword] = useState(false)
  const csrfToken = useCsrfToken()


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    clearErrors()

    try {
      const data = new FormData()
      data.append("user[name]", formData.name)
      data.append("user[email]", formData.email)
      data.append("user[password]", formData.password)
      data.append("user[password_confirmation]", formData.passwordConfirmation)
      data.append("authenticity_token", csrfToken)

      const response = await submit("/api/v1/auth/sign_up", data)

      if (response.ok) {
        navigate("/admin/")
      } else {
        const body = await response.json() as SignUpResponse
        setFieldError("general", "サインアップに失敗しました。入力内容を確認してください。")
        if (body?.errors) {
          for (const [field, messages] of Object.entries(body.errors)) {
            messages.forEach((message: string) => {
              const fieldName = serverToFrontKey(field) as keyof SignUpFormData
              const label = SignUpFieldLabels[fieldName]
              setFieldError(fieldName, `${label} ${message}`)
            })
          }
        }
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

export default useSignUpform
