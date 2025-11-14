interface PasswordFieldProps {
  label: string
  icon?: string
  name: string
  value: string
  error?: string | undefined
  showPassword: boolean
  onTogglePassword: () => void
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  required?: boolean
}

export const PasswordField: React.FC<PasswordFieldProps> = ({
  label,
  icon,
  name,
  value,
  error,
  showPassword,
  onTogglePassword,
  onChange,
  placeholder,
  required = false,
}) => (
  <div className="form-group">
    <label htmlFor={name}>
      {icon && <span className="icon">{icon}</span>}
      {label}
    </label>
    <div className="password-input">
      <input
        type={showPassword ? 'text' : 'password'}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
      <button
        type="button"
        className="toggle-password"
        onClick={onTogglePassword}
      >
        {showPassword ? '👁️' : '👁️‍🗨️'}
      </button>
    </div>
    {error && <span className="error-message">{error}</span>}
  </div>
)
