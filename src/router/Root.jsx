import Header from "@components/header/Header";
import { ProfileProvider } from "@context/profileContext";
import { useAuth } from "@hooks/useAuth";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import queryClient from "@utils/queryClient";
import { Outlet, useLoaderData } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../components/footer/Footer";
import { actions } from "@actions/actions";
import { useEffect, useState } from "react";

export default function Root() {
  const { auth, dispatchAuth } = useAuth();
  const { accessToken, refreshToken, user } = useLoaderData();
  const [isChecked, setIsChecked] = useState(false); //if login status checked or not

  useEffect(() => {
    if (auth.status === "loggedOut") {
      if (accessToken && refreshToken && user) {
        dispatchAuth({
          type: actions.auth.LOGIN,
          payload: { accessToken, refreshToken, user },
        });
      }
    }
    setIsChecked(true);
  }, []);

  let content = (
    <>
      <Header />
      <main>
        <ToastContainer />
        <Outlet />
      </main>
      <Footer />
    </>
  );

  if (!isChecked) {
    content = <div>Loading...</div>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ProfileProvider>{content}</ProfileProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
