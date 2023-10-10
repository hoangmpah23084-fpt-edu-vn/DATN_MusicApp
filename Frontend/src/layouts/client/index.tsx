import React from "react";
import Header from "@/components/Header";
import SidebarMenu from "@/components/SidebarMenu";
import Footer from "@/components/Footer";
import { Outlet } from "react-router-dom";
import SidebarSong from "@/components/SidebarSong";


const LayoutClient = () => {
  const [sideBarRight, setSideBarRight] = React.useState<boolean>(false);

  return (
    <>
      <div className="flex w-[100%] bg-[#170f23] overflow-hidden">
        <SidebarMenu />
        <Header />
        <div className="ml-[300px] relative w-[100%] h-[80%] overscroll-y-auto">
          <Outlet />
        </div>
        <SidebarSong sideBarRight={sideBarRight} />
        <Footer setSideBarRight={setSideBarRight}  />
      </div>
    </>
  );
};

export default LayoutClient;
