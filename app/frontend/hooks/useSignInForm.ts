import { useState } from "react";
import type { SignInFormData, SignInFormErrors } from "@/types/auth";
import useFormState from "@/hooks/useFormState";
import { useNavigate } from "react-router-dom";
import { authService } from "@/services/authService";
import { ApiError } from "@/services/apiClient";

const useSignInForm = () => {
	const navigate = useNavigate();
	const { formData, errors, handleChange, setFieldError, clearErrors } =
		useFormState<SignInFormData, SignInFormErrors>({
			email: "",
			password: "",
			rememberMe: false,
		});

	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		clearErrors();
		setLoading(true);

		try {
			await authService.signIn({
				email: formData.email,
				password: formData.password,
			});
			navigate("/admin/");
		} catch (error) {
			if (error instanceof ApiError) {
				setFieldError(
					"general",
					"メールアドレスまたはパスワードが正しくありません",
				);
			} else {
				setFieldError("general", "ネットワークエラーが発生しました");
			}
		} finally {
			setLoading(false);
		}
	};

	return {
		formData,
		errors,
		handleChange,
		handleSubmit,
		loading,
		showPassword,
		setShowPassword,
	};
};

export default useSignInForm;
