import LayoutClient from "@/layouts/client";
import FavouritePage from "@/pages/Favourite/FavouritePage";
import KhamPhaPage from "@/pages/KhamPha/KhamPhaPage";
import { createBrowserRouter, Outlet, Navigate } from "react-router-dom";

export const router = createBrowserRouter([
  //todo FE
  {
    path: "/",
    element: <LayoutClient />,
    children: [
      { index: true, element: <KhamPhaPage /> },
      { path: "mymusic/song/favorite", element: <FavouritePage /> }],
  },

  //todo BE
  {
    path: "/admin",
    element: (
      <div>
        LayOut Admin <Outlet />
      </div>
    ),
    children: [
      {
        index: true,
        element: <Navigate to={"dashboard"} />,
      },
      {
        path: "dashboard",
        element: <div>Dashboard</div>,
      },
      {
        path: "product",
        element: <div>Product List</div>,
      },
      {
        path: "product/:id",
        element: <div>Product Detail</div>,
      },
    ],
  },
]);
