import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "./pages/login";
import { HomePage } from "./pages/home";

const createAppRouter = () =>
  createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/auth",
      element: <LoginPage />,
    },
  ]);

export default createAppRouter;
