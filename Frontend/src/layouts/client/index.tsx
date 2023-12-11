import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import SidebarMenu from "@/components/SidebarMenu";
import Footer from "@/components/Footer";
import { Link, Outlet } from "react-router-dom";
import SidebarSong from "@/components/SidebarSong";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { handGetSong } from "@/store/Reducer/Song";
import { handGetCurrentSong, setCurrentSong } from "@/store/Reducer/currentSong";
import { RootState } from "@/store/store";
import ModalSignin from "@/components/Modals/modalSignin";
import { checkToken, setToken } from "@/store/Reducer/User";
import { getFavourite } from "@/store/Reducer/favouriteReducer";
import ModalCreatePlaylist from "@/components/Modals/createPlaylist";
import { FaRegDotCircle } from "react-icons/fa";
import { BsBarChartLine, BsFileMusic, BsRadioactive } from "react-icons/bs";
import { MdLibraryMusic } from "react-icons/md";
import { AiFillHome } from "react-icons/ai";

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

  useEffect(() => {
    const song = localStorage.getItem("song");
    async function fetchData() {
      await dispatch(handGetSong()).then(({ payload }) => {
        if (song) {
          const parseSong = JSON.parse(song);
          dispatch(setCurrentSong(parseSong));
        } else {
          localStorage.setItem("song", JSON.stringify(payload.data[0]));
          dispatch(setCurrentSong(payload.data[0]));
        }
        // if (payload.data.length > 0) {

        // }
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
        <div className="fixed z-50 w-[100%] bottom-0 block md:hidden bg-[#1B2039] cursor-pointer text-[#fff]">
          <div className="border border-t-1">
            <ul className=" flex">
              <li className="bg-[#3a3244] w-[25%] flex flex-col justify-center items-center">
                <Link
                  to={"/"}
                  className="flex flex-col items-center leading-[20px] "
                >
                  <FaRegDotCircle className="w-[22px] text-[#ccc] h-[40px]" />
                  <span className=" text-[12px] text-[12px]">Khám Phá</span>
                </Link>
              </li>

              <li className="w-[25%] justify-center items-center">
                <Link
                  to={"/music_charts"}
                  className="flex flex-col items-center leading-[20px] "
                >
                  <BsBarChartLine className="w-[23px] text-[#ccc] h-[40px]" />
                  <span className=" text-[12px]">#BXH</span>
                </Link>
              </li>

              <li className="w-[25%] justify-center items-center">
                <Link
                  to={"/rooms"}
                  className="flex flex-col items-center leading-[20px] "
                >
                  <AiFillHome className="w-[22px] text-[#ccc] h-[40px]" />
                  <span className=" text-[12px]">Phòng nhạc</span>
                </Link>
              </li>

              <li className="w-[25%] justify-center items-center">
                <Link
                  to={"/mymusic/song/favorite"}
                  className="flex flex-col items-center leading-[20px] "
                >
                  <MdLibraryMusic className="w-[22px] text-[#ccc] h-[40px]" />
                  <span className="ml-3 text-[12px]">Thư Viện</span>
                </Link>
              </li>

              <li className="w-[25%] justify-center items-center">
                <Link
                  to={"/album"}
                  className="flex flex-col items-center leading-[20px] "
                >
                  <BsFileMusic className="w-[22px] text-[#ccc] h-[40px]" />
                  <span className=" text-[12px]">Album</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default LayoutClient;
