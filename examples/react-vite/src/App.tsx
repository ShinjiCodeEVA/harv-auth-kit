import "./App.css";
import { RouterProvider } from "react-router-dom";
import createAppRouter from "./router";
import { useMemo } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

function App() {
  const client = new QueryClient();
  const router = useMemo(() => createAppRouter(), []);

  return (
    <>
      <QueryClientProvider client={client}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  );
}

export default App;
