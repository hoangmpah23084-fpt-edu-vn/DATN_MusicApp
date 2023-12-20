import { ifSong } from "@/pages/Admin/Interface/ValidateSong";
import { useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { activeSong } from "@/constane/song.const";
import { setSingerSong } from "@/store/Reducer/Song";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Link } from "react-router-dom";

type Props = {
  item: ifSong;
  indexItem: number;
};

// const [modal, setModal] = useState<boolean>(false);


const BXHItemSong = ({ item, indexItem }: Props) => {
    const { stateSong, dataLocal } = useAppSelector(
        ({ currentSong }) => currentSong
      );
      const { currentSong } = useAppSelector(({ currentSong }) => currentSong);
      const dispatch = useAppDispatch();
  const handToggle = async () => {
    stateSong && dataLocal?._id == item._id
      ? activeSong(dispatch, item, "stopPause")
      : activeSong(dispatch, item, "start");
    dispatch(setSingerSong(item?.id_Singer?._id as string));
  };

  return (
    <div className="flex flex-col">
      <div className="item flex items-center md:space-x-5 hover:bg-stone-700 hover:rounded-md py-[10px]">
        <div className="text-white text-xl min-w-[30px] md:text-3xl md:min-w-[40px] font-bold text-center ">
          <span className="">{indexItem + 1}</span>
        </div>
        <div className="">
          <span className="md:font-bold text-gray-400 text-4xl mr-[15px]">
            -
          </span>
        </div>
        <div className="song group/play flex justify-between gap-x-7 w-full items-center hover:bg-stone-700 hover:rounded-md">
          <div
            className="image_song relative flex items-center md:space-x-3"
            onClick={handToggle}
          >
            <Link to={""} className="relative group/play mr-[15px]">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  fill="#FFF"
                  className="bi bi-play-fill absolute top-[22%] left-[22%] invisible group-hover/play:visible"
                  viewBox="0 0 16 16"
                >
                  <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
                </svg>
              </span>
              <img
                className="rounded-md w-[50px] h-[50px] md:w-[70px] md:h-[70px]"
                src={`${item.song_image}`}
                alt=""
              />
            </Link>
            <div className="name_song md:min-w-[300px] md:space-y-1">
              <p className=" text-white text-[14px] md:text-[18px] font-semibold">
                {item.song_name}
              </p>
              <p className="text-gray-500 md:font-semibold text-[14px] md:text-[15px]">
                {item.id_Singer.name}
              </p>
            </div>
          </div>
          <div className="text-gray-500 font-semibold min-w-[300px] hidden md:block">
            <p>{item?.id_Genre.name}</p>
          </div>
          <div className="time_song pr-[10px] hidden md:block">
            <span className="text-right text-gray-500 font-semibold flex justify-center items-center gap-4">
              {item?.total_like}
              <AiFillHeart className="text-[#3bc8e7]  " />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BXHItemSong;
