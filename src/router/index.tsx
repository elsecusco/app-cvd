import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Expediente from "../components/expediente";
import { Navigate } from "react-router-dom";
export const router = createBrowserRouter([
  {
    path: "/verifica-cvd",
    element: <App />,
  },
  {
    path: "*",
    element: <Navigate to="/verifica-cvd" />,
  },
  {
    path: "/verifica-cvd/:id",
    element: <App />,
  },
  {
    path: "/verifica-cvd/verExpedientePorCVD/:id",
    element: <Expediente />,
  },
]);
