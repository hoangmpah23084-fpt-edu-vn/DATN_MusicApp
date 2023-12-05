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
import { setToken } from "@/store/Reducer/User";
import { getFavourite } from "@/store/Reducer/favouriteReducer";
import SideBarMobile from "@/components/SidebarMenu/SideBarMobile";


const LayoutClient = () => {
  const [widthBrowser, setWidthBrowser] = useState(window.innerWidth);
  const [width, setWidth] = useState(false);
  const [sideBarRight, setSideBarRight] = React.useState<boolean>(false);
  const current = useAppSelector(({ Song }) => Song);
  const dispatch = useAppDispatch();
  const { isToken } = useAppSelector((state: RootState) => state.user);

  const user = localStorage.getItem('user');
  useEffect(() => {
    async function fetchData() {
      await dispatch(handGetSong());
    }
    void fetchData();
  }, [dispatch]);
  useEffect(() => {
    if (current.song.length > 0) {
      localStorage.setItem('song', JSON.stringify(current.song[2]));
      dispatch(handGetCurrentSong(current.song[2]))
    }
  }, [current.song]);

  const token = localStorage.getItem('token');

  useEffect(() => {
    dispatch(setToken(token));
    if (token) {
      dispatch(getFavourite())
    }

  }, [token])

  useEffect(() => {
    const handleResize = () => {
      setWidthBrowser(window.innerWidth);
      if(widthBrowser <= 640) setWidth(true);
    }
    window.addEventListener('resize',handleResize);
    console.log(widthBrowser);
    
    return () => {
      window.removeEventListener('resize',handleResize);
      
    }
  }, []);
  return (
    <>
    {/* <h2>{widthBrowser}</h2> */}
      <div className="md:flex w-[100%] bg-[#170f23] overflow-hidden">
        {isToken && <ModalSignin />}
        {width && <SideBarMobile />}
        <SidebarMenu />
        <Header />
        <div className="ml-[240px] relative w-[100%] h-[calc(100vh-90px)] overscroll-y-auto overflow-x-hidden">
          <Outlet />
        </div>
        <SidebarSong sideBarRight={sideBarRight} />
        <Footer setSideBarRight={setSideBarRight} ListData={current.song} />
      </div>
    </>
  );
};

export default LayoutClient;
