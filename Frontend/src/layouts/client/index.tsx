import React from "react";
import Header from "@/components/Header";
import SidebarMenu from "@/components/SidebarMenu";
import Footer from "@/components/Footer";
import { Outlet } from "react-router-dom";
import SidebarSong from "@/components/SidebarSong";
import RoomPage from "@/pages/Room/RoomPage";

const LayoutClient = () => {
  const [sideBarRight, setSideBarRight] = React.useState<boolean>(false);
  const [liveRoom, setLiveRoom] = React.useState<boolean>(false);

  return (
    <>
      <div className="flex w-[100%] bg-[#170f23] overflow-hidden">
        <SidebarMenu />
        <Header />
        <div className="ml-[240px] relative w-[100%] h-[calc(100vh-90px)] overscroll-y-auto overflow-x-hidden">
          <Outlet />
        </div>
        <SidebarSong sideBarRight={sideBarRight} />
       
        {/* <div className="fixed w-[100%] max-h-[70px] z-100 bottom-0"> */}
          <Footer setSideBarRight={setSideBarRight} setLiveRoom={setLiveRoom} />
          {/* <RoomPage roomLive={liveRoom} /> */}
        {/* </div> */}
      </div>
    </>
  );
};

export default LayoutClient;
