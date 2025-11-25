import { AuthCard, SignInForm } from "@/components/auth";
import useSignInForm from "@/hooks/useSignInForm";
import type React from "react";

const SignIn: React.FC = () => {
	const {
		formData,
		errors,
		handleChange,
		handleSubmit,
		loading,
		showPassword,
		setShowPassword,
	} = useSignInForm();
	return (
		<div className="auth-container">
			<AuthCard
				title="管理者ログイン"
				subtitle="管理者用のログインページです"
				footer={
					<>
						<a href="/admin/password/new">パスワードをお忘れの方</a>
						<span className="divider">|</span>
						<a href="/admin/sign_up">アカウント作成</a>
					</>
				}
			>
				<SignInForm
					formData={formData}
					errors={errors}
					loading={loading}
					showPassword={showPassword}
					onTogglePassword={() => setShowPassword(!showPassword)}
					onChange={handleChange}
					onSubmit={handleSubmit}
				/>
			</AuthCard>
		</div>
	);
};

export default SignIn;
