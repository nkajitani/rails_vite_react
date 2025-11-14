export interface SignInFormData {
  email: string
  password: string
  rememberMe: boolean
}

export interface SignUpFormData {
  name: string
  email: string
  password: string
  passwordConfirmation: string
}

export interface SignInFormErrors {
  email?: string
  password?: string
  general?: string
  [key: string]: string | undefined
}

export interface SignUpFormErrors {
  name?: string
  email?: string
  password?: string
  passwordConfirmation?: string
  general?: string
  [key: string]: string | undefined
}
