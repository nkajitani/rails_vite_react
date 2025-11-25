interface TextFieldProps {
	label: string;
	icon?: string;
	name: string;
	type?: string;
	value: string;
	error?: string | undefined;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	placeholder?: string;
	required?: boolean;
}

export const TextField: React.FC<TextFieldProps> = ({
	label,
	icon,
	name,
	type = "text",
	value,
	error,
	onChange,
	placeholder,
	required = false,
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
		/>
		{error && <span className="error-message">{error}</span>}
	</div>
);
