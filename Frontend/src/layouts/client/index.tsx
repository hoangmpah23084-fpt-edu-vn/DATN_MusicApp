import React from "react";
import Header from "@/components/Header";
import SidebarMenu from "@/components/SidebarMenu";
// import SidebarSong from "@/components/SidebarSong";
import Footer from "@/components/Footer";
// import KhamPhaPage from "@/pages/KhamPha/KhamPhaPage";
import { Outlet } from "react-router-dom";
import SidebarSong from "@/components/SidebarSong";


const LayoutClient = () => {
  const [sideBarRight, setSideBarRight] = React.useState<boolean>(false);
  const [globalPause, setGlobalPause] = React.useState<boolean>(false);

  return (
    <>
      <div className="flex w-[100%] bg-[#170f23] overflow-hidden">
        <SidebarMenu />
        <Header />
        <div className="ml-[300px] relative w-[100%] h-[80%] overscroll-y-auto">
          <Outlet />
        </div>
        {/* <SidebarSong sideBarRight={sideBarRight}  globalPause={globalPause} setGlobalPause={setGlobalPause}  /> */}
        <SidebarSong sideBarRight={sideBarRight} />
        <Footer setSideBarRight={setSideBarRight}  />
        {/* <Footer setSideBarRight={setSideBarRight} globalPause={globalPause} setGlobalPause={setGlobalPause} /> */}
      </div>
    </>
  );
};

export default LayoutClient;
