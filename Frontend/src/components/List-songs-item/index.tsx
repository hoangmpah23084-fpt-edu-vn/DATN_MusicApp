import { BsThreeDots, BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import "./css.scss";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { ifSong } from "@/pages/Admin/Interface/ValidateSong";
import { activeSong } from "@/constane/song.const";
import { setSingerSong } from "@/store/Reducer/Song";
import {
  ActiveFavourites,
  ActiveFavouritesTitle,
  onhandleFavourite,
} from "@/constane/favourites.const";
import { RootState } from "@/store/store";
import ModalSongMenu from "../Modals/modalSongMenu";
import { useState } from "react";
// import { handGetSongInGenre } from "@/store/Reducer/Song";

type Props = {
  section?: string;
  item: ifSong;
};

const ListSongItem = ({ section, item }: Props) => {
  const { token } = useAppSelector((state: RootState) => state.user);
  const [modal, setModal] = useState<boolean>(false);
  const { stateSong, dataLocal } = useAppSelector(
    ({ currentSong }) => currentSong
  );
  const { currentSong } = useAppSelector(({ currentSong }) => currentSong);
  const dispatch = useAppDispatch();
  // console.log(item);

  const handToggle = async () => {
    stateSong && dataLocal?._id == item._id
      ? activeSong(dispatch, item, "stopPause")
      : activeSong(dispatch, item, "start");
    // const {data} = await axios.get(`http://localhost:8080/api/singer/${item.id_Singer}`).then(({data})=> data);
    dispatch(setSingerSong(item?.id_Singer?._id as string));
  };

  const handleShowModalCreateRoom = () => {
    setModal(!modal);
  };

  return (
    <div className="relative list-items px-[15px] w-full h-full">
      {modal && (
        <>
          <ModalSongMenu song={item} onShowModal={handleShowModalCreateRoom} />
        </>
      )}
      <div
        className={`media flex items-center py-[10px] px-[15px] rounded-[5px] text-left hover:bg-[#2f2739] relative z-10 ${section === "chanel" && "bg-[#14182A]"
          }  ${section === "zingchart" && "bg-[#492761] mb-[10px] hover:bg-[#65487a]"
          }`}
      >
        <div className=" media-left flex flex-row grow shrink w-[50%] mr-[10px]">
          <div
            className={`song-prefix ${(section === "zingchart" && "block") || "hidden"
              } flex items-center`}
          >
            <span className="number is-top-1 mr-[15px]">1</span>
          </div>

          <div
            className=" song-thumb block relative shrink-0 overflow-hidden cursor-pointer mr-[10px]"
            onClick={handToggle}
          >
            <div
              className={`${section === "chanel" && "card-image"
                } overflow-hidden relative rounded-[5px]`}
            >
              <img
                className={`rounded-[5px] ${section === "suggested" && "w-[60px] h-[60px]"
                  } ${section === "zingchart" && "w-[60px] h-[60px]"} ${section === "chanel" && "w-[120px] h-[120px]"
                  }`}
                src={`${item.song_image?.length > 0 ? item.song_image[0] : ''}`}
                alt=""
              />
              <div
                className={`overlay absolute w-full h-full top-0 bg-[rgba(0,0,0,.4)] ${currentSong?._id == item?._id && stateSong
                  ? "block"
                  : "hidden"
                  }`}
              ></div>
              <div
                className={`action-container absolute w-full h-[40px] top-[50%] -translate-y-[50%]  ${currentSong?._id == item?._id && stateSong
                  ? "block"
                  : "hidden"
                  } `}
              >
                <div className="flex gap-[20px] h-full justify-center items-center">
                  <div>
                    <div
                      className={`${section === "chanel" && "border rounded-full"
                        } flex justify-center items-center`}
                    >
                      {currentSong?._id == item?._id && stateSong ? (
                        <BsFillPauseFill className="text-[40px] p-1 pl-[6px] " />
                      ) : (
                        <BsFillPlayFill className="text-[40px] p-1 pl-[6px]" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`${(section === "chanel" && "justify-between") || "justify-center"
              } card-title flex flex-col grow shrink relative`}
          >
            <div>
              <div className="capitalize text-[15px]">
                <span>{item?.song_name}</span>
              </div>
              <div className="text-[rgb(140,136,146)] text-[12px] hover:text-[#3BC8E7] hover:underline">
                <Link to={`/singer/${item?.id_Singer?._id}`}>
                  {item?.id_Singer?.name}
                </Link>
              </div>
            </div>
            <div
              className={`${(section === "chanel" && "block") || "hidden"
                } flex justify-between`}
            >
              <span className="order ">#1</span>
              <span className="release-date text-[14px] text-[rgb(140,136,146)] absolute bottom-0 right-0 leading-[1.8]">
                05.10.2023
              </span>
            </div>
          </div>
        </div>

        <div
          className={`media-right ${(section === "suggested" && "block") || "hidden"
            }  ml-[10px]`}
        >
          <div className="hover-items hidden relative z-10">
            <div className="level flex">
              <button
                className="group flex justify-center items-center rounded-full px-[5px] "
                onClick={() =>
                  onhandleFavourite(
                    dispatch,
                    item?._id as string,
                    token as string
                  )
                }
              >
                <ActiveFavourites item={item} />
                <div className="absolute -top-5 -left-9 text-xs w-32 px-[10px] py-[5px] bg-gray-600 text-center rounded-[5px] opacity-0 group-hover:-top-[35px] group-hover:opacity-100 ease-in-out duration-300">
                  <ActiveFavouritesTitle item={item} />
                </div>
              </button>
              <button
                className="group relative flex justify-center items-center rounded-full px-[5px] "
                onClick={() => setModal(true)}
              >
                <BsThreeDots className="px-3 py-2 rounded-full text-[40px] hover:bg-[rgba(204,204,204,.2)] cursor-pointer hover:opacity-80 " />
                <div className="absolute -top-5 right-[ưpx] text-xs px-[10px] py-[5px] bg-gray-600 text-center opacity-0 rounded-[5px] group-hover:opacity-100 group-hover:-top-[35px] ease-in-out duration-300">
                  <p className="text-white">Khác</p>
                </div>
              </button>
            </div>
          </div>
        </div>

        <div
          className={`media-right ${(section === "zingchart" && "block") || "hidden"
            }`}
        >
          <span className="font-bold">26%</span>
        </div>
      </div>
    </div>
  );
};

export default ListSongItem;
