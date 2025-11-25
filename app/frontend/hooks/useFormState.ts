import { useState } from "react";

const useFormState = <
	T extends Record<string, any>,
	E extends Record<string, string | undefined>,
>(
	initialValues: T,
) => {
	const [formData, setFormData] = useState(initialValues);
	const [errors, setErrors] = useState({} as E);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value, type, checked } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: type === "checkbox" ? checked : value,
		}));
		if (errors[name as keyof E]) {
			setErrors((prevErrors) => ({
				...prevErrors,
				[name]: undefined,
			}));
		}
	};

	const setFieldError = (field: keyof E, message: string | undefined) => {
		setErrors((prevErrors) => ({
			...prevErrors,
			[field]: message,
		}));
	};
	const clearErrors = () => setErrors({} as E);

	return { formData, errors, handleChange, setFieldError, clearErrors };
};

export default useFormState;
