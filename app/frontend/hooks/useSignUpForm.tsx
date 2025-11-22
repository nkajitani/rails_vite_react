import useFormState from "@/hooks/useFormState"
import type { SignUpFormData, SignUpFormErrors } from "@/types/auth"
import { SignUpFieldLabels } from "@/types/auth"
import { useState } from "react"
import { serverToFrontKey } from "@/utils/stringUtils"
import { useNavigate } from 'react-router-dom'
import { authService } from "@/services/authService"
import { ApiError } from "@/services/apiClient"

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

  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    clearErrors()
    setLoading(true)

    try {
      await authService.signUp({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        passwordConfirmation: formData.passwordConfirmation,
      })
        navigate("/admin/")
    } catch (error) {
      if (error instanceof ApiError) {
        setFieldError("general", "サインアップに失敗しました。入力内容を確認してください。")

        if (error.errors) {
          for (const [field, messages] of Object.entries(error.errors)) {
            messages.forEach((message: string) => {
              const fieldName = serverToFrontKey(field) as keyof SignUpFormData
              const label = SignUpFieldLabels[fieldName]
              setFieldError(fieldName, `${label} ${message}`)
            })
          }
        }
      } else {
        setFieldError("general", "ネットワークエラーが発生しました")
      }
    } finally {
      setLoading(false)
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
