import { ProfileProvider } from "@context/profileContext";
import { useAuth } from "@hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoutes() {
  const { auth } = useAuth();

  return (
    <>
      {auth.accessToken ? (
        <ProfileProvider>
          <Outlet />
        </ProfileProvider>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
}
