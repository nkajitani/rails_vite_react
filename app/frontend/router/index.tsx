import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignIn from '@/pages/admin/SignIn'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/sign_in" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
