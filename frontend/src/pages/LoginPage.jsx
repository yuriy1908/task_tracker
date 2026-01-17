import { useState, useEffect, use } from "react";
import { useForm } from "react-hook-form";
import { Mail, KeyRound } from "lucide-react";
import api from "../api/axiosClient";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { isAuthenticated } from "../utils/auth";

const LoginPage = () => {

  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/home')
    }
  }, [])

  const [loading, setLoading] = useState(false);
  const {register, handleSubmit} = useForm()

  const loginHandler = async (data) => {
    setLoading(true)
    
    try {
      await api
        .post('/User/login', data)
        .then(res => {
          localStorage.setItem('access_token', res.data);
          navigate('/home')
        });
    }
    catch (error) {
      toast.error(error.message)
    }
    finally {
      setLoading(false)
    }
  } 

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body items-center">
          <h2 className="card-title">Вход</h2>
          <form onSubmit={handleSubmit(loginHandler)} className="items-center  w-full">
            <label className="grow input input-bordered my-1 w-full validator">
              <Mail className="h-[1em] opacity-50" />
              <input 
              {...register("email")}
              type="email" 
              required
              placeholder="Почта" 
              autoComplete="on"/>
            </label>
            <label className="grow input input-bordered my-1 w-full validator">
              <KeyRound className="h-[1em] opacity-50" />
              <input 
                {...register("password")}
                type="password" 
                required 
                placeholder="Пароль"
                autoComplete="on"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
                title="Пароль должен содержать не менее 8 символов, включая 1 цифру, 1 строчную и 1 заглавную букву" />
            </label>
            <div className="card-actions justify-around w-full my-2">
              <button 
                className="btn btn-neutral grow"
                disabled={loading}
                type="submit">
                  Войти</button>
            </div>
          </form>
          <p>Нет аккаунта? <button className="link link-neutral" onClick={ () => {navigate("/register")}}>Регистрация</button></p>
        </div>
      </div>      
    </div>
  )
}

export default LoginPage