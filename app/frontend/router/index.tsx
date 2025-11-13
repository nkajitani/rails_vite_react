import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/sign_in" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
