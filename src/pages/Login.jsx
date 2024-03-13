import LoginForm from "@components/auth/LoginForm";
import { useAuth } from "@hooks/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth?.status === "loggedIn") {
      navigate(`/`);
    }
  }, []);
  return (
    <section className="container">
      {/* Login Form into a box center of the page */}
      <div className="w-full md:w-1/2 mx-auto bg-[#030317] p-8 rounded-md mt-12">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        <LoginForm />
      </div>
    </section>
  );
}
