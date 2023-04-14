import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import Search from "./pages/Search.jsx";
import TopTrack from "./pages/TopTrack.jsx";
import TopArtist from "./pages/TopArtist.jsx";
import TopGenres from "./pages/TopGenres.jsx";
import ListeningHistory from "./pages/ListeningHistory.jsx";
import Dashboard from "./pages/Dashboard.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App title="Wrapped Plus" />,
    children: [
      {
        path: "/",
        element: <TopArtist title="Top Artists | Wrapped Plus" />,
      },
      {
        path: "search",
        element: <Search title="Search | Wrapped Plus" />,
      },
      {
        path: "top-artists",
        element: <TopArtist title="Top Artists | Wrapped Plus" />,
      },
      {
        path: "top-tracks",
        element: <TopTrack title="Top Tracks | Wrapped Plus" />,
      },
      {
        path: "top-genres",
        element: <TopGenres title="Top Genres | Wrapped Plus" />,
      },
      {
        path: "listening-history",
        element: <ListeningHistory title="Listening History | Wrapped Plus" />,
      },
      {
        path: "dashboard",
        element: <Dashboard title="Dashboard | Wrapped Plus" />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
