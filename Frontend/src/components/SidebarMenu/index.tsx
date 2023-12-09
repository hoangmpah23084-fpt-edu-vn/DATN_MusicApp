import { FaRegDotCircle } from "react-icons/fa";
import {
  BsBarChartLine,
  BsRadioactive,
  BsMusicNoteBeamed,
  BsFileMusic,
} from "react-icons/bs";
import { PiClockCounterClockwiseBold } from "react-icons/pi";
import { BiCategory, BiSolidPlaylist } from "react-icons/bi";
import { AiOutlineStar, AiOutlinePlus, AiOutlineHeart } from "react-icons/ai";
import { MdLibraryMusic } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import "./index.scss";
import type { MenuProps } from "antd";
import { Layout, Menu } from "antd";
import { useState, Dispatch, SetStateAction } from "react";

interface props {
  handleShowModalCreateRoom: () => void;
  setCollapsed: Dispatch<SetStateAction<boolean>>;
}

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(
    "Khám phá",
    "/",
    <FaRegDotCircle className="w-[22px] text-[#ccc] h-[22px]" />
  ),
  // getItem(
  //   "#zingchart",
  //   "zingchart",
  //   <BsBarChartLine className="w-[22px] text-[#ccc] h-[22px]" />
  // ),
  // getItem(
  //   "Radio",
  //   "",
  //   <BsRadioactive className="w-[22px] text-[#ccc] h-[22px]" />
  // ),
  getItem(
    "Thư viện",
    "/mymusic/song/favorite",
    <MdLibraryMusic className="w-[22px] text-[#ccc] h-[22px]" />
  ),
  getItem(
    "BXH Nhạc Mới",
    "/music_charts",
    <BsMusicNoteBeamed className="w-[22px] text-[#ccc] h-[22px]" />
  ),
  getItem(
    "Phòng nhạc",
    "/rooms",
    <MdLibraryMusic className="w-[22px] text-[#ccc] h-[22px]" />
  ),

  { type: "divider" },

  // getItem(
  //   "Chủ Đề & Thể Loại",
  //   "",
  //   <BiCategory className="w-[22px] text-[#ccc] h-[22px]" />
  // ),
  // getItem(
  //   "Top 100",
  //   "top100",
  //   <AiOutlineStar className="w-[22px] text-[#ccc] h-[22px]" />
  // ),
  getItem(
    "Nghe gần đây",
    "ngheganday",
    <PiClockCounterClockwiseBold className="h-[22px] w-[22px] flex items-center justify-center rounded-[9px] bg-[#7d32ff] p-[2px] " />
  ),
  getItem(
    "Bài hát yêu thích",
    "/mymusic/song/favorite",
    <AiOutlineHeart className="h-[22px] w-[22px] flex items-center justify-center rounded-[9px] bg-[#10c4ff] p-[2px] text-[#fff]" />
  ),
  getItem(
    "Playlist",
    "/playlist",
    <BiSolidPlaylist className="h-[22px] w-[22px] flex items-center justify-center rounded-[9px] bg-[#fa702e] p-[2px] text-[#fff]" />
  ),
  getItem(
    "Album",
    "/album",
    <BsFileMusic className="h-[22px] w-[22px] flex items-center justify-center rounded-[9px] bg-[#ff4eb0] p-[2px] text-[#fff]" />
  ),
  // getItem(
  //   "Đã tải lên",
  //   "datailen",
  //   <AiOutlineCloudUpload className="h-[22px] w-[22px] flex items-center justify-center rounded-[9px] bg-[#ff4645] p-[2px] text-[#000]" />
  // ),
];

const SidebarMenu = ({ handleShowModalCreateRoom, setCollapsed }: props) => {
  const [isCollapsed, setIscollapsed] = useState(false);
  const navigate = useNavigate();

  return (
    <div className=" text-[#dadada] text-[14px] top-0 left-0 z-40 max-w-[240px] h-[calc(100vh-90px)] transition-transform -translate-x-full sm:translate-x-0 pt-[70px] bg-[#1b2039] hidden sm:block">
      <nav className="zm-navbar ">
        <div
          className={`zm-navbar-brand w-[240px] h-[70px] fixed top-0 pt-0  flex items-center  ${
            isCollapsed ? "pl-0" : "justify-center"
          }`}
        >
          <div className="zm-navbar-item">
            <button className="zm-btn inline-block text-[14px] rounded-[999px] leading-normal border-0 font-[400] cursor-pointer text-center relative">
              <div className="zmp3-logo inline-block">
                {isCollapsed ? (
                  <img src="/logo.png" alt="" />
                ) : (
                  <h1 className="logo">Music SongSync</h1>
                )}
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* <div className=" mb-[16px]">
        <ul className=" ">
          <li className="bg-[#3a3244] border-l-2 border-l-[#3BC8E7]">
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
              <span className="ml-3">#SongSync</span>
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
          <li className="">
            <Link
              to={"/rooms"}
              className="flex items-center leading-[20px] py-[6px] px-[24px]"
            >
              <AiFillHome className="w-[22px] text-[#ccc] h-[40px]" />
              <span className="ml-3">Phòng nhạc</span>
            </Link>
          </li>
        </ul>
      </div> */}

      {/* <div className="sidebar-divide relative h-[1px]"></div>

      <div className="overflow-y-scroll h-[50vh] mt-[16px] " id="style-scrollbar">
        <div className=" ">
          <nav>
            <ul className="">
              <li className="">
                <Link
                  to={"/music_charts"}
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
                  to={"/music_charts"}
                  className="flex items-center leading-[20px] py-[6px] px-[24px]"
                >
                  <AiOutlineStar className="w-[22px] text-[#ccc] h-[40px]" />
                  <span className="ml-3">Top 100</span>
                </Link>
              </li>
            </ul>
          </nav>

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
                  to={"/playlist"}
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
                  to={"/album"}
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
      </div> */}

      <Sider
        collapsible
        // collapsed={collapsed}
        onCollapse={(value) => {
          setCollapsed(value), setIscollapsed(value);
        }}
        width={240}
        style={{
          backgroundColor: "#1b2039",
          color: "#dadada",
          fontSize: "14px",
          height: "100%",
          position: "relative",
        }}
      >
        <Menu
          onClick={({ key }) => navigate(key)}
          mode="vertical"
          items={items}
          defaultSelectedKeys={["/"]}
          style={{
            backgroundColor: "#1b2039",
            paddingLeft: "0",
          }}
        />
      </Sider>

      <div className="add-playlist-sidebar text-[14px]">
        {" "}
        <button
          onClick={() => handleShowModalCreateRoom()}
          className="zm-btn button fixed bottom-0 px-[24px] w-full h-[54px] bg-[#14182A] border-t-[1px] border-[#32323d]"
        >
          <Link to={"#"} className="flex items-center justify-start ">
            <AiOutlinePlus className="w-[20px] text-[#ccc] h-[40px] mr-4" />

            <span className={`${isCollapsed == true ? "hidden" : "block"}`}>
              Tạo playlist mới
            </span>
          </Link>
        </button>
      </div>
    </div>
  );
};

export default SidebarMenu;
