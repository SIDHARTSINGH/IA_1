import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Results from "./Results";
import Home from "./Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "results", element: <Results /> },
    ],
  },
]);

export default router;
