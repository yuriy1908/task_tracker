import { Navigate, Outlet } from "react-router";
import { isAuthenticated } from "../utils/auth";

const ProtectedRoutes = () => {

  if (!isAuthenticated()) return <Navigate to="/login" />;
  return <Outlet/>
}

export default ProtectedRoutes