import { createRoot } from 'react-dom/client'
import LoginForm from '../components/LoginForm'
import '../styles/login.css'

const container = document.getElementById('login-app')
if (container) {
  const root = createRoot(container)
  root.render(<LoginForm />)
}