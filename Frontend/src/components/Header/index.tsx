import { useEffect, useState } from "react";
import { Avatar, Dropdown, Menu, Input } from "antd";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
// import { AiOutlineSetting, AiOutlineSearch } from "react-icons/ai";
import { GoDesktopDownload } from "react-icons/go";

import {
  AiOutlineSearch,
  AiOutlineSetting,
  AiOutlineUser,
  AiOutlineEye,
} from "react-icons/ai";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { ifUser } from "@/pages/Admin/Interface/User";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./index.css";
import type { MenuProps } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import ItemSong from "../Favourites/ItemSong";
import { IApiSong } from "@/pages/Admin/Interface/ValidateSong";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { handGetSongSearch } from "@/store/Reducer/Song";

import DetailUser from "../Modals/DetailUser";
import ChangePassword from "../Modals/ChangePassword";
import { GetUser, resetUser } from "@/store/Reducer/User";

type Props = {
  sideBarRight: boolean;
  collapsed: boolean;
};
const Header = (props: Props) => {
  const [userLocal, setUserLocal] = useState<ifUser | null>(null);
  const { dataUserOne } = useAppSelector((state: RootState) => state.user);
  // const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const navigate = useNavigate();
  const [showUser, setShowUser] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [showPass, setShowPass] = useState<boolean>(false);
  const token = localStorage.getItem("token");
  useEffect(() => {
    const currentUser = localStorage.getItem("user");
    if (currentUser) {
      const parseCurrentUser = JSON.parse(currentUser);
      setUserLocal(parseCurrentUser);
      console.log(parseCurrentUser);
      dispatch(GetUser(parseCurrentUser._id));
    }
  }, []);

  const handleMenuClick = (e: any) => {
    if (e.key === "logout") {
      handleLogout();
      navigate("/");
      toast.success("Đăng xuất thành công!");
    } else if (e.key === "avt") {
    }
  };

  //logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    dispatch(resetUser(null));
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="account">
        <div className="flex items-center">
          {" "}
          {dataUserOne?.image ? (
            <img
              className="rounded-full w-12 h-12 object-cover"
              src={dataUserOne?.image}
              alt=""
            />
          ) : (
            <Avatar size={42} icon={<UserOutlined />} />
          )}
          <b className="ml-2">{dataUserOne?.fullName}</b>
        </div>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="personal" onClick={() => setShowUser(!showUser)}>
        <b className="flex items-center">
          <AiOutlineUser className="mr-2" /> Chỉnh sửa cá nhân
        </b>
      </Menu.Item>
      <Menu.Item key="pw" onClick={() => setShowPass(!showPass)}>
        {" "}
        <b className="flex items-center">
          <AiOutlineEye className="mr-2" /> Đổi mật khẩu
        </b>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout">
        <LogoutOutlined /> Đăng xuất
      </Menu.Item>
    </Menu>
  );
  const { songSearch } = useSelector((state: RootState) => state.Song);
  const items: MenuProps["items"] = songSearch.map((item: any) => {
    return {
      label: (
        <Link to={`/singer/${item.id_Singer?._id}`}>
          {" "}
          <ItemSong item={item} active={true} />
        </Link>
      ),
      key: item.id,
    };
  });

  const onHandleSearch = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e) {
      const data: IApiSong = {
        pageSize: e.target.value !== "" ? 1000 : 5,
        search: e.target.value,
      };
      dispatch(handGetSongSearch(data));
    }
  };

  useEffect(() => {
    dispatch(
      handGetSongSearch({
        pageSize: 5,
      })
    );
  }, []);

  return (
    <>
      {showUser && <DetailUser onShowModal={() => setShowUser(!showUser)} />}
      {showPass && (
        <ChangePassword onShowModal={() => setShowPass(!showPass)} />
      )}
      <div
        className={`flex h-[70px] items-center fixed bg-[#1b2039] left-0 z-20 px-[15px] w-full  md:left-[240px] md:px-[59px] transition-all duration-700
        ${props.collapsed ? "md:left-[80px] md:w-[calc(100vw-80px)]" : ""}
        ${
          props.collapsed && props.sideBarRight
            ? "md:w-[calc(100vw-450px)]"
            : ""
        }
        ${
          props.sideBarRight
            ? "md:w-[calc(100vw-570px)]"
            : "md:w-[calc(100vw-240px)] "
        }`}
      >
        <div className="flex items-center z-1 w-[100%] justify-between">
          <div className="flex flex-1 md:flex-none">
            <IoIosArrowRoundBack className="mr-[20px] w-10 text-[#ccc] hidden items-center h-[40px] md:flex" />
            <IoIosArrowRoundForward className="mr-[20px] w-10 text-[#ccc] h-[40px] hidden md:block" />
            <div className="search w-full lg:flex items-center relative justify-center dropdown-search max-h-[400px]">
              <Dropdown menu={{ items }} trigger={["click"]}>
                <Input
                  addonBefore={
                    <AiOutlineSearch
                      className={`bg-[#3bc8e7] text-[#fff] p-0 text-[20px]`}
                    />
                  }
                  onChange={(
                    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                  ) => onHandleSearch(e)}
                  placeholder="Tìm kiếm bài hát ..."
                  allowClear
                  className="input-search w-full bg-[#fff] h-[40px] text-[14px] rounded-3xl focus:outline-none border-none placeholder: lg:mx-auto lg:w-[30rem]"
                />
              </Dropdown>
            </div>
          </div>
          <div className="flex text-[#fff]">
            <div className="block md:hidden h-[40px] w-[40px] ml-2 md:ml-5 items-center justify-center bg-[#3bc8e7] rounded-full">
              <img src="/logo.png" alt="" />
            </div>

            <div className="hidden md:flex h-[40px] w-[40px] ml-2 md:ml-5 items-center justify-center bg-[#3bc8e7] rounded-full">
              <AiOutlineSetting className=" w-10 h-[20px]" />
            </div>
            {userLocal && token ? (
              <div className="dropdown-profile">
                <Dropdown overlay={menu}>
                  <div className="h-[40px] w-[40px] flex items-center justify-center bg-[#000] rounded-full ml-5">
                    <img
                      src={
                        dataUserOne?.image
                          ? dataUserOne.image
                          : "/user-default.3ff115bb.png"
                      }
                      className="rounded-full"
                      onClick={(e) => e.preventDefault()}
                    />
                  </div>
                </Dropdown>
              </div>
            ) : (
              <div className="flex px-[24px] py-[8px] items-center justify-center text-[#fff] bg-[#3bc8e7] rounded-full ml-2 md:ml-5">
                <Link to="http://localhost:5173/signin">Đăng nhập</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
