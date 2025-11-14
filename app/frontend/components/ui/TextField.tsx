interface TextFieldProps {
  label: string
  icon?: string
  name: string
  type?: string
  value: string
  error?: string | undefined
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  required?: boolean
  autoFocus?: boolean
}

export const TextField: React.FC<TextFieldProps> = ({
  label,
  icon,
  name,
  type = 'text',
  value,
  error,
  onChange,
  placeholder,
  required = false,
  autoFocus = false,
}) => (
  <div className="form-group">
    <label htmlFor={name}>
      {icon && <span className="icon">{icon}</span>}
      {label}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      autoFocus={autoFocus}
    />
    {error && <span className="error-message">{error}</span>}
  </div>
)
