import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Expediente from "../components/expediente";
import { Navigate } from "react-router-dom";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
  {
    path: "/:id",
    element: <App />,
  },
  {
    path: "/verExpedientePorCVD/:id",
    element: <Expediente />,
  },
]);
