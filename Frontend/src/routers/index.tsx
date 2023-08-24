import LayoutAdmin from "@/layouts/admin";
import LayoutClient from "@/layouts/client";
import Artist from "@/pages/Admin/Artist";
import AddArtist from "@/pages/Admin/Artist/addArtist";
import UpdateArtist from "@/pages/Admin/Artist/updateArtist";
import DashBoard from "@/pages/Admin/DashBoard/Index";
import KhamPhaPage from "@/pages/KhamPha/KhamPhaPage";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  //todo FE
  {
    path: "/",
    element: <LayoutClient />,
    children: [{ index: true, element: <KhamPhaPage /> }],
  },

  //todo BE
  {
    path: "/admin",
    element: <LayoutAdmin />,
    children: [
      {
        index: true,
        element:  <DashBoard />,
      },
      {
        path: "dashboard",
        element:  <div>
        Hehe
      </div>,
      },
      {
        path: "song",
        element: <div>Add Song</div>,
      },
      {
        path: "listsong",
        element: <div>List Song</div>,
      },
      {
        path: "artist",
        element: <Artist/>,
      },
      {
        path: "add-artist",
        element: <AddArtist/>,
      },
      {
        path: "update-artist/:id",
        element: <UpdateArtist/>,
      },
      {
        path: "product/:id",
        element: <div>Product Detail</div>,
      },
    ],
  },
]);
