import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import SidebarMenu from "@/components/SidebarMenu";
import Footer from "@/components/Footer";
import { Outlet } from "react-router-dom";
import SidebarSong from "@/components/SidebarSong";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { handGetSong } from "@/store/Reducer/Song";
import { handGetCurrentSong } from "@/store/Reducer/currentSong";
import { RootState } from "@/store/store";
import ModalSignin from "@/components/Modals/modalSignin";
import { checkToken, setToken } from "@/store/Reducer/User";
import { getFavourite } from "@/store/Reducer/favouriteReducer";
import ModalCreatePlaylist from "@/components/Modals/createPlaylist";

const LayoutClient = () => {
  const [widthBrowser, setWidthBrowser] = useState(window.innerWidth);
  const [width, setWidth] = useState(false);
  const [sideBarRight, setSideBarRight] = React.useState<boolean>(false);
  const current = useAppSelector(({ Song }) => Song);
  const dispatch = useAppDispatch();
  const { isToken } = useAppSelector((state: RootState) => state.user);
  const [isShowModalCreatePlaylist, setIsShowModalCreatePlaylist] =
    useState<boolean>(false);

  const [collapsed, setCollapsed] = React.useState<boolean>(false);

  const user = localStorage.getItem("user");
  useEffect(() => {
    async function fetchData() {
      await dispatch(handGetSong()).then(({ payload }) => {
        if (payload.length > 0) {
          localStorage.setItem("song", JSON.stringify(payload[0]));
          dispatch(handGetCurrentSong(payload[0]));
        }
      });
    }
    void fetchData();
  }, []);
  const token = localStorage.getItem("token");
  useEffect(() => {
    dispatch(setToken(token));
    if (token) {
      dispatch(getFavourite());
    }
  }, [token]);

  const handleShowModalCreateRoom = () => {
    if (token) {
      setIsShowModalCreatePlaylist(!isShowModalCreatePlaylist);
    } else {
      dispatch(checkToken(true));
    }
  };

  return (
    <>
      <div className="flex w-[100%] bg-[#14182A] overflow-hidden">
        {isShowModalCreatePlaylist && (
          <ModalCreatePlaylist onShowModal={handleShowModalCreateRoom} />
        )}
        {isToken && <ModalSignin />}
        <SidebarMenu
          // collapsed={collapsed}
          setCollapsed={setCollapsed}
          handleShowModalCreateRoom={handleShowModalCreateRoom}
        />
        <Header collapsed={collapsed} sideBarRight={sideBarRight} />
        <div className="relative w-[100%] h-[calc(100vh-130px)] md:h-[calc(100vh-90px)] overscroll-y-auto overflow-x-hidden">
          <Outlet />
        </div>
        <SidebarSong sideBarRight={sideBarRight} />
        <Footer setSideBarRight={setSideBarRight} ListData={current.song} />
        {/* responsive */}
        <div className="fixed z-50 w-[100%] bottom-0 block md:hidden bg-[#1B2039] cursor-pointer">Nhung</div>
      </div>
    </>
  );
};

export default LayoutClient;
