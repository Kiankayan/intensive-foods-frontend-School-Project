import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "@components/pages/Login";
import Register from "@components/pages/Register";
import { Logout, ProtectedRoute } from "@components/common";
import App from "./App";

import {
  Foods,
  Customers,
  Orders,
  NotFound,
  FoodForm,
} from "./components/common";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Navigate to="/foods" />,
      },

      {
        path: "foods",
        element: <Foods />,
      },

      {
        path: "foods/:id",
        element: <ProtectedRoute />,
        children: [{ index: true, element: <FoodForm /> }],
      },

      {
        path: "customers",
        element: <Customers />,
      },

      {
        path: "orders",
        element: <Orders />,
      },

      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/logout", element: <Logout /> },

  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;
