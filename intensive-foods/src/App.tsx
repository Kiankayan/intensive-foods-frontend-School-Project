import { NavBar } from "@components/common";
import { Outlet } from "react-router-dom";
import "@App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavBar />
      <Outlet />
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}
