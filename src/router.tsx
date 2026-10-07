import { createBrowserRouter } from "react-router-dom";
import Contact from "./pages/contact/Contact";
import Detalhes from "./pages/details/Details";
import Layout from "./components/layout/Layout";
import Home from "./pages/home/Home";
// import PokemonDetail from "./pages/PokemonDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/details/:name",
        element: <Detalhes />,
      },
    ],
  },
]);

export default router;
