import { AiFillHeart } from "react-icons/ai";
import { BsMusicNoteBeamed, BsThreeDots, BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { TfiVideoClapper } from "react-icons/tfi";
import { PiMicrophoneStageDuotone } from "react-icons/pi";
import "./index.css";
import { useEffect, useState } from "react";
import ModalSongMenu from "../../Modals/modalSongMenu";
import { ifSong } from "@/pages/Admin/Interface/ValidateSong";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { activeSong } from "@/constane/song.const";
import { onhandleFavourite } from "@/constane/favourites.const";
import { setDataLocal } from "@/store/Reducer/currentSong";
import { RootState } from "@/store/store";


type props = {
  item: ifSong
}

const ItemSong = ({ item }: props) => {


  const [modal, setModal] = useState<boolean>(false);
  const dispatch = useAppDispatch()



  const { stateSong, dataLocal } = useAppSelector(({ currentSong }) => currentSong);
  const { token } = useAppSelector((state: RootState) => state.user);

  useEffect(() => {
    const getSongLocal = localStorage?.getItem("song") || "";
    if (getSongLocal) {
      const currentlocal: ifSong = JSON?.parse(getSongLocal);
      dispatch(setDataLocal(currentlocal))
    }
  }, []);

  return (
    <tbody>
      <tr className={`item border-b-[#2c2436] border-b-[1px] cursor-pointer hover:bg-[#2f2739] ease-in-out duration-500 first-letter:
      ${dataLocal && dataLocal?._id == item._id
          ? "bg-[#2f2739]"
          : "hover:bg-[#b4b4b32d]"
        } 
      `}>
        <td scope="row" className=" py-2 font-medium flex items-center">
          <span className="px-3">
            <input
              type="checkbox"
              className="item_list hidden w-[14px] h-[14px]"
            />
            <BsMusicNoteBeamed className="item_list_time" />
          </span>
          <div
            className={`card-image overflow-hidden relative rounded-[5px] mr-2`}
          >
            <img
              className={`rounded-[5px] w-10 h-10
               `}
              src={item.song_image[0]}
              alt=""
            />
            <div className="overlay absolute w-full h-full top-0 bg-[rgba(0,0,0,.4)] hidden"></div>
            <div className={`action-container absolute w-full h-[40px] top-[50%] -translate-y-[50%] 
            ${dataLocal &&
                stateSong &&
                dataLocal?._id == item._id ? "" : "hidden"}
            `}>
              <div className="flex gap-[20px] h-full justify-center">
                <div>
                  <div onClick={() =>
                    stateSong && dataLocal?._id == item._id
                      ? activeSong(dispatch, item, 'stopPause')
                      : activeSong(dispatch, item, "start")
                  }>
                    {dataLocal &&
                      stateSong &&
                      dataLocal?._id == item._id ?
                      <BsFillPauseFill className="text-[30px] mt-1 p-1 pl-[5px]" />
                      :
                      <BsFillPlayFill className="text-[30px] p-1 mt-1 pl-[5px]" />
                    }

                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mx-1">
            <p>{item.song_name}</p>
            <Link
              to={`#`}
              className="text-xs text-[#86828c] hover:text-[#3BC8E7] hover:border-b-[#3BC8E7] hover:border-b-[1px]"
            >
              {item.song_singer}
            </Link>
          </div>
        </td>
        <td className="py-2">
          <Link
            to={`#`}
            className="text-sm text-[#86828c] hover:text-[#3BC8E7] hover:border-b-[#3BC8E7] hover:border-b-[1px]"
          >
            album Đạt G
          </Link>
        </td>
        <td>
          <div className="flex items-center justify-center mr-2">
            <button className="item_list mx-2 group relative">
              <TfiVideoClapper className="px-3 py-2 rounded-full text-[40px] hover:bg-[#423a4b] cursor-pointer hover:opacity-80 " />
              <div className="absolute -top-5 -left-9 text-xs w-28 bg-gray-600 text-center rounded-3xl py-1 opacity-0 group-hover:-top-8 group-hover:scale-y-95 group-hover:opacity-100 ease-in-out duration-300">
                <p>Xem MV</p>
              </div>
            </button>

            <button className="item_list mx-2 group relative ">
              <PiMicrophoneStageDuotone className="px-3 py-2 rounded-full text-[40px] hover:bg-[#423a4b] cursor-pointer hover:opacity-80 " />
              <div className="absolute -top-5 -left-11 text-xs w-32 bg-gray-600 text-center rounded-3xl py-1 opacity-0 group-hover:-top-8 group-hover:scale-y-95 group-hover:opacity-100 ease-in-out duration-300">
                <p className="text-white">Phát cùng lời bài hát</p>
              </div>
            </button>

            <button className="text-[#3BC8E7] mx-2 group relative " onClick={() => onhandleFavourite(dispatch, item?._id as string, token as string)}>
              <AiFillHeart className="px-3 py-2 rounded-full text-[40px] hover:bg-[#423a4b] cursor-pointer hover:opacity-80 " />
              <div className="absolute -top-5 -left-11 text-xs w-32 bg-gray-600 text-center rounded-3xl py-1 opacity-0 group-hover:-top-8 group-hover:scale-y-95 group-hover:opacity-100 ease-in-out duration-300">
                <p className="text-white">Xoá khỏi thư viện</p>
              </div>
            </button>

            <button
              className="item_list mx-2 hidden"
              onClick={() => setModal(!modal)}
            >
              <BsThreeDots className="px-3 py-2 rounded-full text-[40px] hover:bg-[#423a4b] cursor-pointer hover:opacity-80 " />
            </button>

            {modal && (
              <>
                <div
                  className="z-40 absolute w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
                  onClick={() => setModal(false)}
                ></div>
                <ModalSongMenu song={item} />
              </>
            )}

            <span className="item_list_time text-sm text-[#86828c]  mx-2 w-[40px] h-[40px] flex items-center justify-center">
              <p className=" rounded-full text-[9px] hover:bg-[#423a4b] cursor-pointer hover:opacity-80 ">
                4:00
              </p>
            </span>
          </div>
        </td>
      </tr>
    </tbody >
  );
};

export default ItemSong;
