export interface SignInFormData {
	email: string;
	password: string;
	rememberMe: boolean;
}

export interface SignUpFormData {
	name: string;
	email: string;
	password: string;
	passwordConfirmation: string;
}

export interface SignInFormErrors {
	email?: string;
	password?: string;
	general?: string;
	[key: string]: string | undefined;
}

export interface SignUpFormErrors {
	name?: string;
	email?: string;
	password?: string;
	passwordConfirmation?: string;
	general?: string;
	[key: string]: string | undefined;
}

export const SignUpFieldLabels: Record<keyof SignUpFormData, string> = {
	name: "名前",
	email: "メールアドレス",
	password: "パスワード",
	passwordConfirmation: "パスワード確認",
};

export interface User {
	id: number;
	name: string;
	email: string;
}

export interface AuthResponse {
	data: User;
	message: string;
}

export interface AuthErrorResponse {
	message: string;
	errors?: Record<string, string[]>;
}
