import { apiClient } from "@/services/apiClient";

interface SignUpParams {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

interface SignInParams {
  email: string;
  password: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface AuthResponse {
  data: User;
  message: string;
}

export const authService = {
  async signUp(params: SignUpParams) {
    return apiClient.post<AuthResponse>("/auth/sign_up", {
      user: {
        name: params.name,
        email: params.email,
        password: params.password,
        password_confirmation: params.passwordConfirmation,
      },
    });
  },

  async signIn(params: SignInParams) {
    return apiClient.post<AuthResponse>("/auth/sign_in", {
      user: {
        email: params.email,
        password: params.password,
      },
    });
  }
}
