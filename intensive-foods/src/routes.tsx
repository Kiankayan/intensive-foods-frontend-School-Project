import { createBrowserRouter, Navigate } from "react-router-dom";

import App from "./App";

import {
  Foods,
  Customers,
  Orders,
  NotFound,
  FoodForm,
} from "./components/common";
import { Login } from "@components/pages";

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
        element: <FoodForm />,
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
]);

export default router;
