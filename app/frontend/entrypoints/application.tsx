import { createRoot } from 'react-dom/client'
import App from '@/router'

import '@/styles/login.css'


const container = document.getElementById('root')
if (container) {
  const root = createRoot(container)
  root.render(<App />)
}
