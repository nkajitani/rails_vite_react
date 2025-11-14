interface CheckboxFieldProps {
  label: string
  name: string
  checked: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const CheckboxField: React.FC<CheckboxFieldProps> = ({
  label,
  name,
  checked,
  onChange,
}) => (
  <div className="form-group checkbox">
    <label>
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
      />
      <span>{label}</span>
    </label>
  </div>
)
