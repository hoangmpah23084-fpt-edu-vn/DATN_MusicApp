import LayoutAdmin from "@/layouts/admin";
import LayoutClient from "@/layouts/client";
import FavouritePage from "@/pages/Favourite/FavouritePage";
import Artist from "@/pages/Admin/Artist/listArtist";
import AddArtist from "@/pages/Admin/Artist/addArtist";
import UpdateArtist from "@/pages/Admin/Artist/updateArtist";
import DashBoard from "@/pages/Admin/DashBoard/Index";
import ListSong from "@/pages/Admin/Song/ListSong";
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
import AlbumAdmin from "@/pages/Admin/Album/Album";
import MusicCharts from "@/pages/BXH/MusicCharts";
import DetailAlbum from "@/pages/Album/DetailAlbum";
import DetailSinger from "@/pages/Singer/DetailSinger";
import DSong from "@/pages/DSong";
import Room from "@/pages/Room/room";
import RoomPage from "@/pages/Room/RoomPage";
import PlaylistPage from "@/pages/Playlist/PlaylistPage";
import AddAlbum from "@/pages/Admin/Album/AddAlbum";
import ListAlbum from "@/pages/Admin/Album/ListAlbum";
import UpdateAlbum from "@/pages/Admin/Album/UpdateAlbum";
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
      { path: "album/:id", element: <DetailAlbum /> },
      { path: "singer/:id", element: <DetailSinger /> },
      { path: "music_charts", element: <MusicCharts /> },
      { path: "dsong", element: <DSong /> }
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
        path: "listsong",
        element: <ListSong />,
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
      },
      {
        path: "album",
        element: <AlbumAdmin />
      }
      ,
      {
        path: "listgenre",
        element: <ListGenre />
      },
      {
        path: "UpdateGenre/:id",
        element: <UpdateGenre />
      },
    ],
  },
]);
