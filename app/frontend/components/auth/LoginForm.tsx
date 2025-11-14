
import { Alert, SubmitButton } from '@/components/ui'
import { PasswordField } from '@/components/ui'
import { TextField } from '@/components/ui'
import type { SignInFormData, SignInFormErrors } from '@/types/auth'

interface LoginFormProps {
  formData: SignInFormData
  errors: SignInFormErrors
  loading: boolean
  showPassword: boolean
  onTogglePassword: () => void
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

export const LoginForm: React.FC<LoginFormProps> = ({
  formData,
  errors,
  loading,
  showPassword,
  onTogglePassword,
  onChange,
  onSubmit,
 }) => {
  return (
    <form onSubmit={onSubmit} className="login-form">
      <Alert message={errors.general} />

      <TextField
        label="メールアドレス"
        icon="📧"
        type="email"
        name="email"
        value={formData.email}
        onChange={onChange}
        placeholder="example@email.com"
        required
        autoFocus
        error={errors.email}
      />

      <PasswordField
        label="パスワード"
        icon="🔒"
        name="password"
        value={formData.password}
        onChange={onChange}
        placeholder="••••••••"
        required
        showPassword={showPassword}
        onTogglePassword={onTogglePassword}
        error={errors.password}
      />
      <SubmitButton loading={loading}>ログイン</SubmitButton>
    </form>
  )
}
