import { useAuth } from "@hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoutes() {
  const { auth } = useAuth();

  return <>{auth.user ? <Outlet /> : <Navigate to="/login" />}</>;
}
