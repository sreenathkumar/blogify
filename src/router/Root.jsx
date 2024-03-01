import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "@components/Header";
import { QueryClient, QueryClientProvider } from "react-query";

export default function Root() {
  return (
    <QueryClientProvider client={QueryClient}>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </QueryClientProvider>
  );
}
