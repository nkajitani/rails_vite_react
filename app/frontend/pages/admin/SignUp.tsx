import useSignUpform from "@/hooks/useSignUpForm";
import { AuthCard } from "@/components/auth";
import { SignUpForm } from "@/components/auth";

const SignUp: React.FC = () => {
	const {
		formData,
		errors,
		handleChange,
		handleSubmit,
		loading,
		showPassword,
		setShowPassword,
	} = useSignUpform();

	return (
		<div className="auth-container">
			<AuthCard
				title="管理者アカウント作成"
				subtitle="新しい管理者アカウントを作成します"
				footer={
					<>
						<a href="/admin/sign_in">既にアカウントをお持ちの方</a>
					</>
				}
			>
				<SignUpForm
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

export default SignUp;
