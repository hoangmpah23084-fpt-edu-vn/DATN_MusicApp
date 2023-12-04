import { useEffect, useState } from "react";
import type { MenuProps } from "antd";
import { Avatar, Button, Dropdown } from "antd";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import { AiOutlineSearch, AiOutlineSetting } from "react-icons/ai";
import { GoDesktopDownload } from "react-icons/go";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import Input from "../Input";
import { Link, useLocation } from "react-router-dom";
import { ifUser } from "@/pages/Admin/Interface/User";

type Props = {};
const Header = (props: Props) => {
const [userLocal, setUserLocal] = useState<ifUser | null>(null);
useEffect(() => {
  const currentUser = localStorage.getItem("user");
  if (currentUser) {
    const parseCurrentUser = JSON.parse(currentUser);
    setUserLocal(parseCurrentUser);
    console.log(parseCurrentUser);
  }
},[]);

const logout = () => {
  localStorage.removeItem('user');
};
const items: MenuProps["items"] = [
  {
    key: "1",
    // label: <Avatar size={64} src={user.image} />,
    label: <>
      <Avatar size={64} icon={<UserOutlined />} />
      <b> dtv</b>
    </>,
  },
  {
    key: "1",
    label: <hr/>,
  },
  {
    key: "2",
    label: <b>Cá nhân</b>,
  },
  {
    key: "3",
    label: "Đổi ảnh đại diện",
  },
  {
    key: "4",
    label: "Đổi mật khẩu",
  },
  {
    key: "5",
    label: <hr/>,
  },
  {
    key: "6",
    label: "Đăng xuất",
    icon: <LogoutOutlined />,
    // onClick={this: handleClick as MenuClickEventHandler},
  }
];


  if (userLocal || useLocation().pathname === '/') {
    return (
      <div className="flex h-[70px] items-center fixed bg-[#170f23] ml-[240px] z-50 w-full">
        <div className="flex items-center z-1 w-[100%] px-[59px]">
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
            <div className="bg-[#2f2739] rounded-full">
              <div className="flex px-[24px] py-[8px] items-center justify-center text-[#c273ee]">
                <GoDesktopDownload className="mr-[5px]" />
                <span className="font-inter">Tải bản macOS</span>
              </div>
            </div>
            <div className="h-[40px] w-[40px] ml-5 flex items-center justify-center bg-[#2f2739] rounded-full">
              <AiOutlineSetting className=" w-10 h-[20px]" />
            </div>
            { userLocal
              ?
              <>
              <Dropdown menu={{ items }} placement="bottomRight">
                <div className="h-[40px] w-[40px] flex items-center justify-center bg-[#2f2739] rounded-full ml-5">
                  <img src="/user-default.3ff115bb.png" className="rounded-full" />
                </div>
              </Dropdown>
              </>
              :
              // <Button type="primary" shape="round"><Link to="http://localhost:5173/signin">Đăng nhập</Link></Button>
              <div className="flex px-[24px] py-[8px] items-center justify-center text-[#c273ee] bg-[#2f2739] rounded-full ml-5">
                <Link to="http://localhost:5173/signin">Đăng nhập</Link>
              </div>
            }
            
          </div>
        </div>
      </div>
    )};
  };

export default Header;