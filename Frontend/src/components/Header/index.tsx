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
    <div className="flex h-[70px] items-center fixed bg-[#170f23] ml-[300px] z-50 w-full" >
      <div className="flex items-center z-1 w-[100%]">
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
        <div className="flex text-[#fff] justify-around ml-56">
          <div className=" bg-[#2f2739] rounded-full">
            <div className="flex px-[24px] py-[8px] items-center justify-center text-[#c273ee]">
              <GoDesktopDownload className="mr-[5px]" />
              <span className="font-inter">Tải bản macOS</span>
            </div>
          </div>
          <div className="h-[40px] w-[40px] ml-5 flex items-center justify-center bg-[#2f2739] rounded-full">
            <AiOutlineSetting className=" w-10 h-[20px]" />
          </div>
          <div className="h-[40px] w-[40px] flex items-center justify-center bg-[#2f2739] rounded-full ml-5">
            <img src="/user-default.3ff115bb.png" className="rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
