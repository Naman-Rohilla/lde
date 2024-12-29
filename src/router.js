import { createBrowserRouter } from "react-router-dom";
import Root from "./root";
import Home from "./components/home";
import InfraById from "./components/infraById";
import Admin from "./components/admin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />, // This is your main layout
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/admin",
        element: <Admin />,
      },
      {
        path: "/infrastructure",
        element: <InfraById />,
      },
      // {
      //   path: "movie",
      //   element: <Movie />,
      // },
    ],
  },
]);

export default router;
