import { AiOutlineArrowRight } from "react-icons/ai";
import {
  BsMusicNoteBeamed,
  BsThreeDots,
  BsFillPlayFill,
  BsFillPauseFill,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import "./index.css";
import { useEffect, useState } from "react";
import ModalSongMenu from "../../Modals/modalSongMenu";
import { ifSong } from "@/pages/Admin/Interface/ValidateSong";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { activeSong } from "@/constane/song.const";
import {
  ActiveFavourites,
  ActiveFavouritesTitle,
  onhandleFavourite,
} from "@/constane/favourites.const";
import { setCurrentSong } from "@/store/Reducer/currentSong";
import { RootState } from "@/store/store";
import { setSongFavourite } from "@/store/Reducer/Song";
type props = {
  item: ifSong,
  active?: boolean,
  listSong?: ifSong[],
  activeSideBarSong?: boolean,
  activeHistory?: boolean,
  activePlaylist?: boolean,
  activeFavourite?: boolean,
  activeAbum?: boolean,

}

const ItemSong = ({ item, active, activeSideBarSong, activeHistory, activePlaylist, activeFavourite, activeAbum }: props) => {
  const [modal, setModal] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { stateSong, dataLocal } = useAppSelector(
    ({ currentSong }) => currentSong
  );
  const { token } = useAppSelector((state: RootState) => state.user);
  const { listFavourites } = useAppSelector((state: RootState) => state.favourites);
  const { playlistDetail } = useAppSelector((state: RootState) => state.playlist);
  const { listOneAlbum } = useAppSelector((state: RootState) => state.album);



  useEffect(() => {
    const getSongLocal = localStorage?.getItem("song") || "";
    if (getSongLocal) {
      const currentlocal: ifSong = JSON?.parse(getSongLocal);
      dispatch(setCurrentSong(currentlocal));
    }
  }, []);

  const handTakeFavourite = (id: string | undefined) => {
    if (activeHistory) {
      const history = localStorage.getItem('history')
      if (history) {
        const parsedHistory = JSON.parse(history) as ifSong[];
        if (parsedHistory) {
          const newData = parsedHistory.map((item: any) => (JSON.parse(item)))
          dispatch(setSongFavourite(newData));
        }
      }
    }
    if (activePlaylist) {
      dispatch(setSongFavourite(playlistDetail.list_song));
    }

    if (activeFavourite) {
      dispatch(setSongFavourite(listFavourites));
    }

    if (activeAbum) {
      dispatch(setSongFavourite(listOneAlbum));

    }

    stateSong && dataLocal?._id == id
      ? activeSong(dispatch, item, "stopPause")
      : activeSong(dispatch, item, "start");
  };

  const handleShowModalCreateRoom = () => {
    setModal(!modal);
  };

  return (
    <tr
      className={`item border-b-[#2c2436] border-b-[1px] flex-1 cursor-pointer ease-in-out duration-300 first-letter:
      ${dataLocal && dataLocal?._id == item._id
          ? "bg-[#14182A]"
          : "hover:bg-[#b4b4b32d]"
        } 
      `}
    >
      <td
        scope="row"
        className="py-2 font-medium flex items-center min-w-[300px]"
      >
        <span className="px-3">
          {activeSideBarSong ? (
            <></>
          ) : (
            <>
              <input
                type="checkbox"
                className="item_list hidden w-[14px] h-[14px]"
              />
              <BsMusicNoteBeamed className="item_list_time" />
            </>
          )}
        </span>
        <div
          className={`card-image overflow-hidden relative rounded-[5px] mr-2`}
        >
          <img
            className={`rounded-[5px] w-10 h-10
               `}
            src={item.song_image.length > 0 ? item.song_image[0] : ''}
            alt=""
          />
          <div className="overlay absolute w-full h-full top-0 bg-[rgba(0,0,0,.4)] hidden"></div>
          <div
            className={`action-container absolute w-full h-[40px] top-[50%] -translate-y-[50%] 
            ${dataLocal && stateSong && dataLocal?._id == item._id
                ? ""
                : "hidden"
              }
            `}
          >
            <div className="flex gap-[20px] h-full justify-center">
              <div>
                <div onClick={() => handTakeFavourite(item._id)}>
                  {dataLocal && stateSong && dataLocal?._id == item._id ? (
                    <BsFillPauseFill className="text-[30px] mt-1 p-1 pl-[5px]" />
                  ) : (
                    <BsFillPlayFill className="text-[30px] p-1 mt-1 pl-[5px]" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-1 ">
          <p>{item.song_name}</p>
          <Link
            to={`#`}
            className="text-xs text-[#86828c] hover:text-[#3BC8E7] hover:border-b-[#3BC8E7] hover:border-b-[1px]"
          >
            {item.id_Singer?.name}
          </Link>
        </div>
      </td>

      {activeSideBarSong ? (
        <></>
      ) : (
        <td className="py-2 min-w-[120px]">
          <Link
            to={`#`}
            className="text-sm text-[#86828c] hover:text-[#9b4de0] hover:border-b-[#9b4de0] hover:border-b-[1px]"
          >
            {item.id_Genre?.name}
          </Link>
        </td>
      )}

      {active ? (
        <td className="w-[10%] ">
          <AiOutlineArrowRight />
        </td>
      ) : (
        <td className="h-full">
          <div
            className={`${activeSideBarSong
              ? "flex"
              : "flex items-center justify-center mr-2"
              }`}
          >
            <button
              className="text-[#3BC8E7] mx-2 group relative "
              onClick={() =>
                onhandleFavourite(
                  dispatch,
                  item?._id as string,
                  token as string
                )
              }
            >
              <ActiveFavourites item={item} />
              <div className="absolute -top-5 -left-11 text-xs w-30 bg-gray-600 text-center rounded-3xl py-1 opacity-0 group-hover:-top-8 group-hover:scale-y-95 group-hover:opacity-100 ease-in-out duration-300">
                <ActiveFavouritesTitle item={item} />
              </div>
            </button>

            <button
              className="ml-8"
              onClick={() => setModal(!modal)}
            >
              <BsThreeDots className="px-3 py-2 rounded-full text-[40px] hover:bg-[#423a4b] cursor-pointer hover:opacity-80 " />
            </button>

            {modal && (
              <>
                <ModalSongMenu
                  song={item}
                  onShowModal={handleShowModalCreateRoom}
                />
              </>
            )}


          </div>
        </td>
      )}
    </tr>
  );
};

export default ItemSong;
