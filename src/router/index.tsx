import { createBrowserRouter } from "react-router-dom";
import CVD from "../components/cvd";
import Expediente from "../components/expediente";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <CVD />,
  },
  {
    path: "/:id",
    element: <CVD />,
  },
  {
    path: "/expedienteCVD/:id",
    element: <Expediente />,
  },
]);
