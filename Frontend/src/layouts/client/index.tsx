import React from "react";
import Header from "@/components/Header";
import SidebarMenu from "@/components/SidebarMenu";
import SidebarSong from "@/components/SidebarSong";
import Footer from "@/components/Footer";
type Props = {};

const LayoutClient = (props: Props) => {
  return (
    <>
      <div className="flex w-[100%] bg-[#170f23]">
        <SidebarMenu />
        <Header />
        <SidebarSong />
        <Footer/>
      </div>
    </>
  );
};

export default LayoutClient;
