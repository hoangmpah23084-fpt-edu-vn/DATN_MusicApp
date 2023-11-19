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
  AiFillHome,
} from "react-icons/ai";
import { MdLibraryMusic } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import "./index.scss";
import { useState } from "react";
import type { MenuProps } from "antd";
import { Layout, Menu } from "antd";
// type Props = {};

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
    "#zingchart",
    "zingchart",
    <BsBarChartLine className="w-[22px] text-[#ccc] h-[22px]" />
  ),
  getItem(
    "Radio",
    "radio",
    <BsRadioactive className="w-[22px] text-[#ccc] h-[22px]" />
  ),
  getItem(
    "Thư viện",
    "/mymusic/song/favorite",
    <MdLibraryMusic className="w-[22px] text-[#ccc] h-[22px]" />
  ),

  { type: "divider" },

  getItem(
    "BXH Nhạc Mới",
    "bxh",
    <BsMusicNoteBeamed className="w-[22px] text-[#ccc] h-[22px]" />
  ),
  getItem(
    "Chủ Đề & Thể Loại",
    "chude",
    <BiCategory className="w-[22px] text-[#ccc] h-[22px]" />
  ),
  getItem(
    "Top 100",
    "top100",
    <AiOutlineStar className="w-[22px] text-[#ccc] h-[22px]" />
  ),
  getItem(
    "Nghe gần đây",
    "ngheganday",
    <PiClockCounterClockwiseBold className="h-[22px] w-[22px] flex items-center justify-center rounded-[9px] bg-[#7d32ff] p-[2px] " />
  ),
  getItem(
    "Bài hát yêu thích",
    "baihatyeuthich",
    <AiOutlineHeart className="h-[22px] w-[22px] flex items-center justify-center rounded-[9px] bg-[#10c4ff] p-[2px] text-[#fff]" />
  ),
  getItem(
    "Playlist",
    "playlist",
    <BiSolidPlaylist className="h-[22px] w-[22px] flex items-center justify-center rounded-[9px] bg-[#fa702e] p-[2px] text-[#fff]" />
  ),
  getItem(
    "Album",
    "album",
    <BsFileMusic className="h-[22px] w-[22px] flex items-center justify-center rounded-[9px] bg-[#ff4eb0] p-[2px] text-[#fff]" />
  ),
  getItem(
    "Đã tải lên",
    "datailen",
    <AiOutlineCloudUpload className="h-[22px] w-[22px] flex items-center justify-center rounded-[9px] bg-[#ff4645] p-[2px] text-[#000]" />
  ),
];

const SidebarMenu = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="text-[#dadada] text-[14px] transition-transform -translate-x-full sm:translate-x-0 pt-[70px] bg-[#2a213a] z-0">
      <nav className="zm-navbar ">
        <div className="zm-navbar-brand w-[240px] h-[70px] fixed top-0 pt-0 pr-[25px] pl-[28px] flex items-center">
          <div className="zm-navbar-item">
            <button className="zm-btn inline-block text-[14px] rounded-[999px] leading-normal border-0 font-[400] cursor-pointer text-center relative">
              <div className="zmp3-logo w-[120px] h-[40px] inline-block"></div>
            </button>
          </div>
        </div>
      </nav>

      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        width={240}
        style={{
          backgroundColor: "#2a213a",
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
            backgroundColor: "#2a213a",
            paddingLeft: "0",
          }}
        />
      </Sider>

      <div className="add-playlist-sidebar text-[14px] ">
        <button className="zm-btn button fixed bottom-0 px-[24px] w-full h-[54px]  border-t-[1px] border-[#32323d]">
          <Link to={"#"} className="flex items-center justify-start ">
            <AiOutlinePlus className="w-[20px] text-[#ccc] h-[40px] mr-4" />
            <span>Tạo playlist mới</span>
          </Link>
        </button>
      </div>
    </div>
  );
};

export default SidebarMenu;
