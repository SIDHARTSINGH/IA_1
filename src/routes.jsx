import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Results from "./Results";
import SearchBox from "./SearchBox";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <SearchBox /> },
      { path: "results", element: <Results /> },
    ],
  },
]);

export default router;
