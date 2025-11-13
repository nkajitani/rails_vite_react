import { useState } from 'react'

interface FormData {
  email: string
  password: string
  rememberMe: boolean
}

interface LoginFormErrors {
  email?: string
  password?: string
  rememberMe?: boolean
  general?: string
}

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    rememberMe: false,
  })

  const [errors, setErrors] = useState<LoginFormErrors>({})
  const [loading, setLoading] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const getCsrfToken = (): string => {
    const meta = document.querySelector('meta[name="csrf-token"]')
    return meta ? meta.getAttribute('content') || '' : ''
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }))
    if (errors[name as keyof LoginFormErrors]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: undefined,
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrors({})

    try {
      // FormDataとして送信（Deviseが期待する形式）
      const formDataToSend = new FormData()
      formDataToSend.append('user[email]', formData.email)
      formDataToSend.append('user[password]', formData.password)
      if (formData.rememberMe) {
        formDataToSend.append('user[remember_me]', '1')
      }
      formDataToSend.append('authenticity_token', getCsrfToken())

      const response = await fetch('/api/v1/auth/sign_in', {
        method: 'POST',
        headers: {
          'X-CSRF-Token': getCsrfToken(),
        },
        body: formDataToSend,
      })

      if (response.ok || response.redirected) {
        // ログイン成功（リダイレクトされる場合もある）
        window.location.href = '/admin'
      } else {
        // ログイン失敗
        setErrors({
          general: 'メールアドレスまたはパスワードが正しくありません',
        })
      }
    } catch (error) {
      setErrors({
        general: 'ネットワークエラーが発生しました',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>ログイン</h1>
          <p>アカウントにサインインしてください</p>
        </div>

        {errors.general && (
          <div className="alert alert-error">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">
              <span className="icon">📧</span>
              メールアドレス
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@email.com"
              required
              autoFocus
            />
            {errors.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">
              <span className="icon">🔒</span>
              パスワード
            </label>
            <div className="password-input">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            {errors.password && (
              <span className="error-message">{errors.password}</span>
            )}
          </div>

          <div className="form-group checkbox">
            <label>
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              <span>ログインを記憶する</span>
            </label>
          </div>

          <button
            type="submit"
            className="submit-button"
            disabled={loading}
          >
            {loading ? (
              <span className="spinner">⏳</span>
            ) : (
              'ログイン'
            )}
          </button>
        </form>

        <div className="login-footer">
          <a href="/admin/password/new">パスワードをお忘れの方</a>
          <span className="divider">|</span>
          <a href="/admin/sign_up">アカウント作成</a>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
