import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import {
  AiOutlineSetting,
} from "react-icons/ai";
import { GoDesktopDownload } from "react-icons/go";
import { Link } from "react-router-dom";
import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';
import { Input } from 'antd';
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import ItemSong from "../Favourites/ItemSong";
import { IApiSong } from "@/pages/Admin/Interface/ValidateSong";
import { useAppDispatch } from "@/store/hooks";
import { handGetSongSearch } from "@/store/Reducer/Song";
import { useEffect } from "react";

const Header = () => {
  const dispatch = useAppDispatch()
  const { songSearch, } = useSelector((state: RootState) => state.Song)
  const items: MenuProps['items'] = songSearch.map((item: any) => {
    return {
      label: <Link to={`/singer/${item.id_Singer._id}`}> <ItemSong item={item} active={true} /></ Link>,
      key: item.id,
    }
  })
  const onHandleSearch = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e) {
      const data: IApiSong = {
        pageSize: e.target.value !== "" ? 1000 : 5,
        search: e.target.value
      }
      dispatch(handGetSongSearch(data))
    }
  }

  useEffect(() => {
    dispatch(handGetSongSearch({
      pageSize: 5
    }))
  }, [])

  return (
    <>
      <div className="flex h-[70px] items-center fixed bg-[#170f23] ml-[240px] z-50 w-full" >
        <div className="flex items-center justify-between z-1 w-[100%] px-[59px]">
          <div className="flex">
            <IoIosArrowRoundBack className="mr-[20px] w-10 text-[#ccc] flex items-center h-[40px]" />
            <IoIosArrowRoundForward className="mr-[20px] w-10 text-[#ccc] h-[40px]" />
            <div className="search w-full lg:flex items-center relative justify-center dropdown-search max-h-[400px]">
              <Dropdown menu={{ items }} trigger={['click']}>
                <Input onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onHandleSearch(e)} placeholder="Tìm kiếm bài hát ..." allowClear className="input-search w-full bg-[#2f2739] h-[40px] text-[14px] rounded-3xl focus:outline-none border-none placeholder: pl-9 lg:mx-auto lg:w-[30rem]" />
              </Dropdown>
            </div>
          </div>
          <div className="flex text-[#fff] mr-52">
            <div className=" bg-[#2f2739] rounded-full">
              <div className="flex px-[24px] py-[8px] items-center justify-center text-[#c273ee]">
                <GoDesktopDownload className="mr-[5px]" />
                <span className="font-inter">Tải bản macOS</span>
              </div>
            </div>
            <div className="h-[40px] w-[40px] ml-5 flex items-center justify-center bg-[#2f2739] rounded-full">
              <AiOutlineSetting className=" w-10 h-[20px]" />
            </div>
            <Link to="http://localhost:5173/signup">
              <div className="h-[40px] w-[40px] flex items-center justify-center bg-[#2f2739] rounded-full ml-5">
                <img src="/user-default.3ff115bb.png" className="rounded-full" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>

  );
};

export default Header;
