import React from "react";
import "./css.scss";
import { Menu, MenuProps } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { FaRegDotCircle } from "react-icons/fa";
import { BsBarChartLine, BsFileMusic } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import { MdLibraryMusic } from "react-icons/md";
type Props = {};

const FooterMobile = (props: Props) => {
  const navigate = useNavigate();
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
      "BXH",
      "/music_charts",
      <BsBarChartLine className="w-[22px] text-[#ccc] h-[22px]" />
    ),
    getItem(
      "Phòng nhạc",
      "/rooms",
      <AiFillHome className="w-[22px] text-[#ccc] h-[22px]" />
    ),
    getItem(
      "Thư viện",
      "/mymusic/song/favorite",
      <MdLibraryMusic className="w-[22px] text-[#ccc] h-[22px]" />
    ),
    getItem(
      "Album",
      "/album",
      <BsFileMusic className="w-[22px] text-[#ccc] h-[22px]" />
    ),
  ];
  return (
    <div className="footer-mobile fixed z-50 w-[100%] bottom-0 block sm:hidden bg-[#1B2039] cursor-pointer text-[#fff] h-[60px] ">
      <div className="border border-t-[1px] border-[#32323d]">
        <Menu
          onClick={({ key }) => navigate(key)}
          mode="horizontal"
          items={items}
          defaultSelectedKeys={["/"]}
          style={{
            backgroundColor: "#1b2039",
            paddingLeft: "0",
          }}
        />
      </div>
    </div>
  );
};

export default FooterMobile;
