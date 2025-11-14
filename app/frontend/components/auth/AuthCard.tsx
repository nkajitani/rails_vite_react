import type { SignInFormData, SignInFormErrors } from '@/types/auth'

type AuthCardProps = {
  title: string
  subtitle: string
  children: React.ReactNode
  footer?: React.ReactNode
}

export const AuthCard: React.FC<AuthCardProps> = ({ title, subtitle, children, footer }) => (
<div className="login-card">
  <div className="login-header">
    <h1>{title}</h1>
    <p>{subtitle}</p>
  </div>

  {children}

  {footer && <div className="login-footer">{footer}</div>}
</div>
)
