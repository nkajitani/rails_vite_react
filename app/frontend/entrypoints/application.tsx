import { createRoot } from 'react-dom/client'
import App from '@/router'

import '@/styles/auth.css'
import '@/styles/tailwind.css'

const container = document.getElementById('root')
if (container) {
  const root = createRoot(container)
  root.render(<App />)
}
