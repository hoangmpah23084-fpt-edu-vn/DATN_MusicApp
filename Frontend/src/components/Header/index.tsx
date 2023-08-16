import React from "react";
import { HiOutlineArrowRight, HiOutlineArrowLeft } from "react-icons/hi";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import {
  AiOutlineSearch,
  AiOutlineSetting,
  AiOutlineUser,
} from "react-icons/ai";
import { GoDesktopDownload } from "react-icons/go";
import Input from "../Input";
type Props = {};

const Header = (props: Props) => {
  return (
    <div className="flex h-[70px] items-center fixed left-[240px] right-[330px] bg-[#170f23] top-0 px-[60px]">
      <div className="flex justify-between items-center z-1 w-[100%]">
        <div className="flex">
          <IoIosArrowRoundBack className="mr-[20px] w-10 text-[#ccc] flex items-center h-[40px]" />
          <IoIosArrowRoundForward className="mr-[20px] w-10 text-[#ccc] h-[40px]" />
          <div className="search w-full lg:flex items-center justify-center text-[#fff]">
            <Input
              prefix={
                <AiOutlineSearch className="text-2xl ml-2 text-[#d9d9d9] absolute" />
              }
              type="search"
              placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát..."
            />
          </div>
        </div>
        <div className="flex text-[#fff]">
          <div className=" bg-[#2f2739] rounded-full mr-[15px]">
            <div className="flex px-[24px] py-[8px] items-center justify-center text-[#c273ee]">
              <GoDesktopDownload className="mr-[5px]" />
              <span className="font-inter">Tải bản macOS</span>
            </div>
          </div>
          <div className="h-[40px] w-[40px] flex items-center justify-center bg-[#2f2739] rounded-full mr-[15px]">
            <AiOutlineSetting className=" w-10 h-[20px]" />
          </div>
          <div className="h-[40px] w-[40px] flex items-center justify-center bg-[#2f2739] rounded-full">
            <img src="/user-default.3ff115bb.png" className="rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
