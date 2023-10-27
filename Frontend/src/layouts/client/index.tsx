import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import SidebarMenu from "@/components/SidebarMenu";
import Footer from "@/components/Footer";
import { Outlet } from "react-router-dom";
import SidebarSong from "@/components/SidebarSong";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { ifSong } from "@/pages/Admin/Interface/ValidateSong";
import { handGetSong } from "@/store/Reducer/Song";


const LayoutClient = () => {
  const [sideBarRight, setSideBarRight] = React.useState<boolean>(false);
  const current = useAppSelector(({ Song }) => Song);
  const dispatch = useAppDispatch();
  const [currentSong, setCurrentSong] = useState<ifSong | null>(null);

  useEffect(() => {
    async function fetchData() {
      await dispatch(handGetSong());
    }
    void fetchData();
  }, [dispatch]);
  useEffect(() => {
    if (current.song.length > 0) {
      setCurrentSong(current.song[2]);
    }
  }, [current.song]);
  return (
    <>
      <div className="flex w-[100%] bg-[#170f23] overflow-hidden">
        <SidebarMenu />
        <Header />
        <div className="ml-[240px] relative w-[100%] h-[calc(100vh-90px)] overscroll-y-auto overflow-x-hidden">
          <Outlet />
        </div>
        <SidebarSong sideBarRight={sideBarRight} setCurrentSong={setCurrentSong} />
        <Footer setSideBarRight={setSideBarRight} ListData={current.song} currentSong={currentSong} setCurrentSong={setCurrentSong} />
      </div>
    </>
  );
};

export default LayoutClient;
