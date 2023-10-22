import LayoutAdmin from "@/layouts/admin";
import LayoutClient from "@/layouts/client";
import FavouritePage from "@/pages/Favourite/FavouritePage";
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
import Signnup from "@/pages/Register/Signup";
import Signin from "@/pages/Register/Login";
import AddAlbum from "@/pages/Admin/Album/AddAlbum";
import ListAlbum from "@/pages/Admin/Album/ListAlbum";
import UpdateAlbum from "@/pages/Admin/Album/UpdateAlbum";
import ListArtist from "@/pages/Admin/Artist/ListArtist";
import AddArtist from "@/pages/Admin/Artist/AddArtist";
import UpdateArtist from "@/pages/Admin/Artist/UpdateArtist";

export const router = createBrowserRouter([
  //todo FE
  {
    path: "/signup",
    element: <Signnup/>
  },
  {
    path: "/signin",
    element: <Signin/>
  },
  {
    path: "/",
    element: <LayoutClient />,
    children: [
      { index: true, element: <KhamPhaPage /> },
      { path: "mymusic/song/favorite", element: <FavouritePage /> }],
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
        path: "list-artist",
        element: <ListArtist/>,
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
        path: "list-album",
        element: <ListAlbum/>,
      },
      {
        path: "add-album",
        element: <AddAlbum/>,
      },
      {
        path: "update-album/:id",
        element: <UpdateAlbum/>,
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
