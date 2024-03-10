import { Outlet } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Header from "@components/header/Header";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { ProfileProvider } from "@context/profileContext";
import "react-toastify/dist/ReactToastify.css";
import queryClient from "@utils/queryClient";

export default function Root() {
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
