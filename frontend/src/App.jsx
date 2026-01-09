import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Route, Routes, Navigate } from 'react-router'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import HomePage from './pages/HomePage'
import ProtectedRoutes from './components/ProtectedRoutes'

const App = () => {

  return (
    <div className='bg-base-200'>
    <Routes>
      <Route path="/" element={<Navigate to="/login" />}></Route>
      <Route path="/login" element={<LoginPage/>}></Route>
      <Route path="/register" element={<RegisterPage/>}></Route>
      <Route element={<ProtectedRoutes/>}>
        <Route path="/home" element={<HomePage/>}></Route>
      </Route>
    </Routes>
    </div>
  )
}

export default App
