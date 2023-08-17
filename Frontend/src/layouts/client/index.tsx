import React from "react";
import Header from "@/components/Header";
import SidebarMenu from "@/components/SidebarMenu";
import SidebarSong from "@/components/SidebarSong";
import Footer from "@/components/Footer";
import KhamPhaPage from "@/pages/KhamPha/KhamPhaPage";
import { Outlet } from "react-router-dom";
type Props = {};

const LayoutClient = (props: Props) => {
  return (
    <>
      <div className="flex w-[100%] bg-[#170f23]">
        <SidebarMenu />
        <Header />
        <div className="mr-[330px] flex-grow-1 w-[calc(100%-570px)]">
          <div className="relative w-[100%] h-[80%] mt-[70px]">
            <Outlet />
          </div>
        </div>
        <SidebarSong />
        <Footer />
      </div>
    </>
  );
};

export default LayoutClient;
