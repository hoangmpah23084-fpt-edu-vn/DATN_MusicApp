import { useEffect, useState } from "react";
import { Avatar, Dropdown, Menu, message, Input } from "antd";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import { AiOutlineSetting, AiOutlineSearch } from "react-icons/ai";
import { GoDesktopDownload } from "react-icons/go";
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
import { useAppDispatch } from "@/store/hooks";
import { handGetSongSearch } from "@/store/Reducer/Song";

type Props = {
  sideBarRight: boolean;
  collapsed: boolean;
};
const Header = (props: Props) => {
const [userLocal, setUserLocal] = useState<ifUser | null>(null);
const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
const navigate = useNavigate();
const dispatch = useAppDispatch()
const token = localStorage.getItem('token')

//check-signin
useEffect(() => {
  const currentUser = localStorage.getItem("user");
  if (currentUser) {
    const parseCurrentUser = JSON.parse(currentUser);
    setUserLocal(parseCurrentUser);
    console.log(parseCurrentUser);
  }
},[]);

  const handleMenuClick = (e: any) => {
    if (e.key === "logout") {
      handleLogout();
      navigate("/");
      toast.success("Đăng xuất thành công!");
    } else if (e.key === "avt") {
    }
  };

  //change avt
  const handleAvatarUpload = (info: any) => {
    if (info.file.status === "done") {
      // Lấy đường dẫn ảnh đã tải lên từ response
      const imageUrl = info.file.response.imageUrl;
      setAvatarUrl(imageUrl);

      message.success("Tải ảnh lên thành công");
    } else if (info.file.status === "error") {
      message.error("Lỗi tải ảnh lên");
    }
  };

//logout
const handleLogout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

//dropdown-user
const menu = (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key="account">
      <Avatar size={50} icon={<UserOutlined/>}/>
      <b> dtv</b>
    </Menu.Item>
    <Menu.Divider style={{ 'backgroundColor':'#3a2d4d' }}/>
    <Menu.Item key="personal"><b>Cá nhân</b></Menu.Item>
    <Menu.Item key="avt">Đổi ảnh đại diện</Menu.Item>
    <Menu.Item key="pw">Đổi mật khẩu</Menu.Item>
    <Menu.Divider style={{ 'backgroundColor':'#3a2d4d' }}/>
    <Menu.Item key="logout"><LogoutOutlined /> Đăng xuất</Menu.Item>
  </Menu>
);

const { songSearch, } = useSelector((state: RootState) => state.Song)
const items: MenuProps['items'] = songSearch.map((item: any) => {
  return {
    label: <Link to={`/singer/${item.id_Singer?._id}`}> <ItemSong item={item} active={true} /></ Link>,
    key: item.id,
  }
})

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
                  addonBefore={<AiOutlineSearch className={`bg-[#3bc8e7] text-[#fff] p-0 text-[20px]`}/>}
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
            <div className="h-[40px] w-[40px] ml-5 flex items-center justify-center bg-[#3bc8e7] rounded-full">
              <AiOutlineSetting className=" w-10 h-[20px]" />
            </div>
            {userLocal && token ? (
              <div className="dropdown-profile">
                <Dropdown overlay={menu}>
                  <div className="h-[40px] w-[40px] flex items-center justify-center bg-[#2f2739] rounded-full ml-5">
                    <img
                      src="/user-default.3ff115bb.png"
                      className="rounded-full"
                      onClick={(e) => e.preventDefault()}
                    />
                  </div>
                </Dropdown>
              </div>
            ) : (
              <div className="flex px-[24px] py-[8px] items-center justify-center text-[#fff] bg-[#3bc8e7] rounded-full ml-5">
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
