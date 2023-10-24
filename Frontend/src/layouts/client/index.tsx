import React from "react";
import Header from "@/components/Header";
import SidebarMenu from "@/components/SidebarMenu";
// import SidebarSong from "@/components/SidebarSong";
import Footer from "@/components/Footer";
// import KhamPhaPage from "@/pages/KhamPha/KhamPhaPage";
import { Outlet } from "react-router-dom";


const LayoutClient = () => {
  return (
    <>
      <div className="flex w-[100%] bg-[#170f23]">
        <SidebarMenu />
        <Header />
        <div className="ml-[300px] relative w-[100%] h-[80%] overscroll-y-auto">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default LayoutClient;
