"use client";

import { QueryClient, QueryClientProvider } from "react-query";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5000,
      // @ts-ignore err: unknown -> err: AxiosError
      retry: (failureCount, err: AxiosError) => {
        if (err.response?.status === 401) {
          return false; // do not retry, trigger error
        }

        // otherwise, restore default
        const defaultRetry = new QueryClient().getDefaultOptions().queries
          ?.retry;

        return typeof defaultRetry === "function"
          ? defaultRetry(failureCount, err)
          : defaultRetry;
      },
      // @ts-ignore err: unknown -> err: AxiosError
      onError: (err: AxiosError) => {
        err.data.message
          ? toast.error(err.data.message)
          : toast.error(err.message);
        if (err.status === 401) {
          // clear token , user_details and reload page
          localStorage.removeItem("token");
          localStorage.removeItem("user_details");
          window.location.href = "/";
        }
      },
    },
  },
});

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        transition={Slide}
        pauseOnFocusLoss={false}
      />
    </>
  );
}
