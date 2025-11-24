import { toast } from "react-hot-toast";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Mail, KeyRound } from "lucide-react";
import {set, useForm} from "react-hook-form"
import axios from "axios";
import { useNavigate } from "react-router";
import { useState } from "react";

const RegisterPage = () => {

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  const auth = useContext(AuthContext)

  const {register, handleSubmit} = useForm()

  const registerHandler = async (data) => {
    setLoading(true)
    try {
      await axios.post(
        '/api/auth/register',
        data
      )
      const userData = await axios.post(
        '/api/auth/login',
        data)
      auth.login(userData.token, userData.userId)
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
          <h2 className="card-title">Регистрация</h2>
          <form onSubmit={handleSubmit(registerHandler)} className="items-center w-full">
            {/* email */}
            <label className="grow input input-bordered my-1 w-full validator">
              <Mail className="h-[1em] opacity-50" />
              <input 
                {...register("email")}
                type="email" 
                required
                placeholder="Почта" 
                autoComplete="on"
              />
            </label>
            {/* password */}
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
                className="btn btn-primary grow" 
                disabled={loading}
                type="submit">
                  Зарегистрироваться</button>
            </div>
          </form>
          <p>Уже есть аккаунт? <button className="link link-primary" onClick={ () => {navigate("/login")}}>Вход</button></p>
        </div>
        
        
      </div>        
    </div>
  )
}
export default RegisterPage