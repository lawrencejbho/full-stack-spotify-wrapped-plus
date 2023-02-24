import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import TopTrack from "./pages/TopTrack.jsx";
import TopArtist from "./pages/TopArtist.jsx";
import Search from "./pages/Search.jsx";
import Test from "./pages/Test.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      // {
      //   path: "search",
      //   element: <Search />,
      // },
      // {
      //   path: "top-artists",
      //   element: <TopArtist />,
      // },
      // {
      //   path: "search",
      //   element: <TopTrack />,
      // },
      {
        path: "test",
        element: <Test />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
