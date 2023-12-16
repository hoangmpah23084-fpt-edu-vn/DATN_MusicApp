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
import "./index.css";
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

  getItem(
    "Nghe gần đây",
    "/history",
    <PiClockCounterClockwiseBold className="h-[22px] w-[22px] flex items-center justify-center rounded-[9px] bg-[#7d32ff] p-[2px] " />
  ),

  getItem(
    "Playlist",
    "/playlist",
    <BiSolidPlaylist className="h-[22px] w-[22px] flex items-center justify-center rounded-[9px] bg-[#fa702e] p-[2px] text-[#fff]" />
  ),
  // getItem(
  //   "Album",
  //   "/album",
  //   <BsFileMusic className="h-[22px] w-[22px] flex items-center justify-center rounded-[9px] bg-[#ff4eb0] p-[2px] text-[#fff]" />
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
