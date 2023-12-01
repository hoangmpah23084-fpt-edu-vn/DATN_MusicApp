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
import Playlist from "@/pages/Playlist/Playlist";
import Room from "@/pages/Room/room";
import RoomPage from "@/pages/Room/RoomPage";
import PlaylistPage from "@/pages/Playlist/PlaylistPage";
import AddAlbum from "@/pages/Admin/Album/AddAlbum";
import ListAlbum from "@/pages/Admin/Album/ListAlbum";
import UpdateAlbum from "@/pages/Admin/Album/UpdateAlbum";
import ListArtist from "@/pages/Admin/Artist/listArtist";
import AddArtist from "@/pages/Admin/Artist/addArtist";
import UpdateArtist from "@/pages/Admin/Artist/updateArtist";

export const router = createBrowserRouter([
  //todo FE
  {
    path: "/signup",
    element: <Signnup />,
  },
  {
    path: "/signin",
    element: <Signin />
  },
  {

    path: "/",
    element: <LayoutClient />,
    children: [
      { index: true, element: <KhamPhaPage /> },
      { path: "mymusic/song/favorite", element: <FavouritePage /> },
      { path: "rooms", element: <Room /> },
      { path: "playlist", element: <Playlist /> },
      { path: "playlist/:id", element: <PlaylistPage /> },
      { path: "album", element: <Album /> },
    ],
  },
  {
    path: "/liveRoom/:id", element: <RoomPage />
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
        element: <Artist />,
      },
      {
        path: "add-artist",
        element: <AddArtist />,
      },
      {
        path: "update-artist/:id",
        element: <UpdateArtist />,
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
        path: "UpdateGenre/:id",
        element: <UpdateGenre />
      }
    ],
  },
]);
