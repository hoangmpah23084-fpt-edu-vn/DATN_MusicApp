import LayoutAdmin from "@/layouts/admin";
import LayoutClient from "@/layouts/client";
import FavouritePage from "@/pages/Favourite/FavouritePage";
import ListSinger from "@/pages/Admin/Singer/ListSinger";
import DashBoard from "@/pages/Admin/DashBoard/Index";
import ListSong from "@/pages/Admin/Song/ListSong";
import ListUser from "@/pages/Admin/User/ListUser";
import KhamPhaPage from "@/pages/KhamPha/KhamPhaPage";
import { Navigate, createBrowserRouter } from "react-router-dom";
import ListGenre from "@/pages/Admin/genre/ListGenre";
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
import HistorySong from "@/pages/HistorySong/history";
import React, { ReactElement } from "react";

interface PrivateRouteProps {
  element: ReactElement;
}


const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, ...rest }) => {
  let isAuthenticated = false;
  const user = localStorage.getItem('user')
  if (user) {
    const data = JSON.parse(user)
    if (data.role === 'admin') {
      isAuthenticated = true

    } else {
      isAuthenticated = false
    }
  }
  return isAuthenticated ? (
    React.cloneElement(element, rest)
  ) : (
    <Navigate to="/" />
  );
};

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
      { path: "dsong", element: <DSong /> },
      { path: "history", element: <HistorySong /> }
    ],
  },
  {
    path: "/liveRoom/:id", element: <RoomPage />
  },
  //todo BE
  {
    path: "/admin",
    element: <PrivateRoute element={<LayoutAdmin />} />,
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
        element: <ListUser2 />,
      },
      {
        path: "listSinger",
        element: <ListSinger />,
      },
      {
        path: "album",
        element: <AlbumAdmin />
      }
      ,
      {
        path: "genre",
        element: <ListGenre />
      }
    ],
  },
]);
