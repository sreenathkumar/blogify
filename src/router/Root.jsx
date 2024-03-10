import { Outlet } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Header from "@components/header/Header";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { ProfileProvider } from "@context/profileContext";
import "react-toastify/dist/ReactToastify.css";
import queryClient from "@utils/queryClient";
import useLoginCheck from "@hooks/useLoginCheck";
import { useAuth } from "@hooks/useAuth";

export default function Root() {
  const { auth, dispatchAuth } = useAuth();
  useLoginCheck(auth, dispatchAuth);
  return (
    <QueryClientProvider client={queryClient}>
      <ProfileProvider>
        <Header />
        <main>
          <ToastContainer />
          <Outlet />
        </main>
        <Footer />
      </ProfileProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
