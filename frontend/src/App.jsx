import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Route, Routes, Navigate } from 'react-router'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

const App = () => {

  return (
    <div className='bg-base-200'>
    <Routes>
      <Route path="/" element={<Navigate to="/login" />}></Route>
      <Route path="/login" element={<LoginPage/>}></Route>
      <Route path="/register" element={<RegisterPage/>}></Route>
    </Routes>
    </div>
  )
}

export default App
