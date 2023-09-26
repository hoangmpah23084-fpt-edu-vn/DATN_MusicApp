import React from "react";
import { FaRegDotCircle } from "react-icons/fa";
import {
  BsBarChartLine,
  BsRadioactive,
  BsMusicNoteBeamed,
  BsFileMusic,
} from "react-icons/bs";
import { PiClockCounterClockwiseBold } from "react-icons/pi";
import { BiCategory, BiSolidPlaylist } from "react-icons/bi";
import {
  AiOutlineStar,
  AiOutlinePlus,
  AiOutlineHeart,
  AiOutlineCloudUpload,
} from "react-icons/ai";
import { MdLibraryMusic } from "react-icons/md";
import { Link } from "react-router-dom";
import "./index.css"

// type Props = {};

const SidebarMenu = () => {
  return (
    <aside className=" fixed text-[#dadada] text-[14px] top-0 left-0 z-40 w-[240px] h-[calc(100vh-90px)] transition-transform -translate-x-full sm:translate-x-0 pt-[70px] bg-[#231b2e] ">
      <nav className="zm-navbar ">
        <div className="zm-navbar-brand w-[240px] h-[70px] fixed top-0 pt-0 pr-[25px] pl-[28px] flex items-center">
          <div className="zm-navbar-item">
            <button className="zm-btn inline-block text-[14px] rounded-[999px] leading-normal border-0 font-[400] cursor-pointer text-center relative">
              <div className="zmp3-logo w-[120px] h-[40px] inline-block"></div>
            </button>
          </div>
        </div>
      </nav>

      <div className=" mb-[16px]">
        <ul className=" ">
          <li className="bg-[#3a3244] border-l-2 border-l-[#9b4de0]">
            <Link
              to={"/"}
              className="flex items-center leading-[20px] py-[6px] px-[21px]"
            >
              <FaRegDotCircle className="w-[22px] text-[#ccc] h-[40px]" />
              <span className="ml-3">Khám Phá</span>
            </Link>
          </li>

          <li className="">
            <Link
              to={"/"}
              className="flex items-center leading-[20px] py-[6px] px-[24px]"
            >
              <BsBarChartLine className="w-[23px] text-[#ccc] h-[40px]" />
              <span className="ml-3">#zingchart</span>
            </Link>
          </li>

          <li className="">
            <Link
              to={"/"}
              className="flex items-center leading-[20px] py-[6px] px-[24px]"
            >
              <BsRadioactive className="w-[22px] text-[#ccc] h-[40px]" />
              <span className="ml-3">Radio</span>
            </Link>
          </li>

          <li className="">
            <Link
              to={"/mymusic/song/favorite"}
              className="flex items-center leading-[20px] py-[6px] px-[24px]"
            >
              <MdLibraryMusic className="w-[22px] text-[#ccc] h-[40px]" />
              <span className="ml-3">Thư Viện</span>
            </Link>
          </li>
        </ul>
      </div>

      <div className="sidebar-divide relative h-[1px]"></div>

      <div className="overflow-y-scroll h-[490px] mt-[16px] " id="style-scrollbar">
        <div className=" ">
          <nav>
            <ul className="">
              <li className="">
                <Link
                  to={"/"}
                  className="flex items-center leading-[20px] py-[6px] px-[24px]"
                >
                  <BsMusicNoteBeamed className="w-[22px] text-[#ccc] h-[40px]" />
                  <span className="ml-3">BXH Nhạc Mới</span>
                </Link>
              </li>
              <li className="">
                <Link
                  to={"/"}
                  className="flex items-center leading-[20px] py-[6px] px-[24px]"
                >
                  <BiCategory className="w-[22px] text-[#ccc] h-[40px]" />
                  <span className="ml-3">Chủ Đề & Thể Loại</span>
                </Link>
              </li>
              <li className="">
                <Link
                  to={"/"}
                  className="flex items-center leading-[20px] py-[6px] px-[24px]"
                >
                  <AiOutlineStar className="w-[22px] text-[#ccc] h-[40px]" />
                  <span className="ml-3">Top 100</span>
                </Link>
              </li>
            </ul>
          </nav>

          {/* Chưa đăng nhập */}
          {/* <div className="py-[15px] px-[8px] mx-[20px] my-[10px] text-center text-[#fff] bg-[#9b4de0] rounded-[8px]">
            <div className="text-[12px] mb-[10px] font-semibold">
              Đăng nhập để khám phá playlist dành riêng cho bạn
            </div>
            <button className="rounded-[20px] flex justify-center items-center bg-[#3a3244] py-[6px] px-[35px] text-[12px] font-semibold border-[1px] uppercase mx-auto">
              <Link to={"#"}>Đăng nhập</Link>
            </button>
          </div> */}

          {/* Đã đăng nhập */}
          <div className="py-[15px] px-[8px] mx-[20px] my-[10px] text-center text-[#fff] bg-gradient-to-r from-[#5a4be7] to-[#c86dd7] rounded-[8px]">
            <div className="text-[12px] mb-[10px] font-semibold">
              Nghe nhạc không quảng cáo cùng kho nhạc PREMIUM
            </div>
            <button className="rounded-[20px] flex justify-center items-center text-[#32323d] bg-[#ffdb01] py-[6px] px-3 text-[12px] font-bold uppercase mx-auto">
              <Link to={"#"}>Nâng cấp tài khoản</Link>
            </button>
          </div>

          <nav>
            <ul className="">
              <li className="">
                <Link
                  to={"/"}
                  className="flex items-center leading-[20px] py-[13px] px-[24px]"
                >
                  <div className="h-[26px] w-[26px] flex items-center justify-center rounded-[9px] bg-[#7d32ff]">
                    <PiClockCounterClockwiseBold className="w-[18px] text-[#fff] h-[40px]" />
                  </div>
                  <span className="ml-3">Nghe gần đây</span>
                </Link>
              </li>
              <li className="">
                <Link
                  to={"/mymusic/song/favorite"}
                  className="flex items-center leading-[20px] py-[13px] px-[24px]"
                >
                  <div className="h-[26px] w-[26px] flex items-center justify-center rounded-[9px] bg-[#10c4ff]">
                    <AiOutlineHeart className="w-[18px] text-[#fff] h-[40px]" />
                  </div>
                  <span className="ml-3">Bài hát yêu thích</span>
                </Link>
              </li>
              <li className="">
                <Link
                  to={"/"}
                  className="flex items-center leading-[20px] py-[13px] px-[24px]"
                >
                  <div className="h-[26px] w-[26px] flex items-center justify-center rounded-[9px] bg-[#fa702e]">
                    <BiSolidPlaylist className="w-[18px] text-[#fff] h-[40px]" />
                  </div>
                  <span className="ml-3">Playlist</span>
                </Link>
              </li>
              <li className="">
                <Link
                  to={"/"}
                  className="flex items-center leading-[20px] py-[13px] px-[24px]"
                >
                  <div className="h-[26px] w-[26px] flex items-center justify-center rounded-[9px] bg-[#ff4eb0]">
                    <BsFileMusic className="w-[18px] text-[#fff] h-[40px]" />
                  </div>
                  <span className="ml-3">Album</span>
                </Link>
              </li>
              <li className="">
                <Link
                  to={"/"}
                  className="flex items-center leading-[20px] py-[13px] px-[24px]"
                >
                  <div className="h-[26px] w-[26px] flex items-center justify-center rounded-[9px] bg-[#ff4645]">
                    <AiOutlineCloudUpload className="w-[18px] text-[#fff] h-[40px]" />
                  </div>
                  <span className="ml-3">Đã tải lên</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="add-playlist-sidebar text-[14px]">
        {" "}
        <button className="zm-btn button fixed bottom-0 px-[24px] w-full h-[54px] bg-[#170f23] border-t-[1px] border-[#32323d]">
          <Link to={"#"} className="flex items-center justify-start ">
            <AiOutlinePlus className="w-[20px] text-[#ccc] h-[40px] mr-4" />
            <span>Tạo playlist mới</span>
          </Link>
        </button>
      </div>
    </aside>
  );
};

export default SidebarMenu;
