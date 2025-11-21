import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignIn from '@/pages/admin/SignIn'
import SignUp from '@/pages/admin/SignUp'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/sign_in" element={<SignIn />} />
        <Route path="/admin/sign_up" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
