import { Alert, PasswordField, SubmitButton, TextField } from '@/components/ui'
import type { SignUpFormData, SignUpFormErrors } from '@/types/auth'

interface SignUpFormProps {
  formData: SignUpFormData
  errors: SignUpFormErrors
  loading: boolean
  showPassword: boolean
  onTogglePassword: () => void
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

export const SignUpForm: React.FC<SignUpFormProps> = ({
  formData,
  errors,
  loading,
  showPassword,
  onTogglePassword,
  onChange,
  onSubmit,
 }) => {
  return (
    <form onSubmit={onSubmit} className="auth-form">
      <Alert message={errors.general} />

      <TextField
        label="名前"
        icon="👤"
        type="text"
        name="name"
        value={formData.name}
        onChange={onChange}
        placeholder="山田 太郎"
        required
        autoFocus
        error={errors.name}
      />

      <TextField
        label="メールアドレス"
        icon="📧"
        type="email"
        name="email"
        value={formData.email}
        onChange={onChange}
        placeholder="example@example.com"
        required
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
      <PasswordField
        label="パスワード確認"
        icon="🔒"
        name="passwordConfirmation"
        value={formData.passwordConfirmation}
        onChange={onChange}
        placeholder="••••••••"
        required
        showPassword={showPassword}
        onTogglePassword={onTogglePassword}
        error={errors.passwordConfirmation}
      />
      <SubmitButton loading={loading}>アカウント作成</SubmitButton>
    </form>
  )
} 
