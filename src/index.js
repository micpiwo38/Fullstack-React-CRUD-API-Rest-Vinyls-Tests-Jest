import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import "bootswatch/dist/minty/bootstrap.css";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import Vinyls from "./components/Vinyls/Vinyls";

const routeur = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <PageNotFound />,
  },
  {
    path: "/vinyls",
    element: <Vinyls />,
    errorElement: <PageNotFound />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={routeur} />);
