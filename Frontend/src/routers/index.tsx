import LayoutAdmin from "@/layouts/admin";
import LayoutClient from "@/layouts/client";
import Artist from "@/pages/Admin/Artist/listArtist";
import AddArtist from "@/pages/Admin/Artist/addArtist";
import UpdateArtist from "@/pages/Admin/Artist/updateArtist";
import DashBoard from "@/pages/Admin/DashBoard/Index";
import AddSong from "@/pages/Admin/Song/AddSong";
import ListSong from "@/pages/Admin/Song/ListSong";
import UpdateSong from "@/pages/Admin/Song/UpdateSong";
import ListUser from "@/pages/Admin/User/ListUser";
import KhamPhaPage from "@/pages/KhamPha/KhamPhaPage";
import { createBrowserRouter } from "react-router-dom";
import Genre from "@/pages/Admin/genre/Genre";
import ListGenre from "@/pages/Admin/genre/ListGenre";
import UpdateGenre from "@/pages/Admin/genre/UpdateGenre";
import Album from "@/pages/Album/Album";

export const router = createBrowserRouter([
  //todo FE
  {
    path: "/",
    element: <LayoutClient />,
    children: [{ index: true, element: <KhamPhaPage /> }],
  },
  {
    path: "/album",
    element: <LayoutClient />,
    children: [{ index: true, element: <Album/> }],

  },
  //todo BE
  {
    path: "/admin",
    element: <LayoutAdmin />,
    children: [
      {
        index: true,
        element: <DashBoard />,
      },
      {
        path: "dashboard",
        element: <div>
          Hehe
        </div>,
      },
      {
        path: "song",
        element: <AddSong />,
      },
      {
        path: "listsong",
        element: <ListSong />,
      },
      {
        path: "updatesong/:id",
        element: <UpdateSong />,
      },
      {
        path: "listuser",
        element: <ListUser />,
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
      }
      ,
      {
        path: "addgenre",
        element: <Genre />
      }
      ,
      {
        path: "listgenre",
        element: <ListGenre />
      },
      {
        path : "UpdateGenre/:id",
        element : <UpdateGenre />
      }
    ],
  },
]);
