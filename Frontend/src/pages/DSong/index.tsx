import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ifSong } from "../Admin/Interface/ValidateSong";
import axios from "axios";
import { Howl } from "howler";
import SkeletonDs from "./SkeletonDs";
import { IoIosPlay } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setCurrentSong, setStateSong } from "@/store/Reducer/currentSong";
import { IoPause } from "react-icons/io5";
import { activeSong } from "@/constane/song.const";

type Props = {};

const DSong = (props: Props) => {
  const [song, setSong] = useState<any | []>([]);
  const [loading, setLoading] = useState(false);
  const { stateSong, currentSong } = useAppSelector(
    ({ currentSong }) => currentSong
  );
  const dispatch = useAppDispatch();

  const SeconToMinuste = (secs: number) => {
    if (secs) {
      const minutes = Math.floor(secs / 60);
      const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const seconds = Math.floor(secs % 60);
      const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
      return `${returnedMinutes}:${returnedSeconds}`;
    } else {
      return "00:00";
    }
  };

  const fetchAndLogDurations = async (songs: ifSong[]) => {
    const durations = await Promise.all(
      songs.map(async (item) => {
        const sound = new Howl({
          src: [`${item.song_link}`],
        });
        return new Promise((resolve) => {
          sound.once("load", () => {
            resolve({ ...item, duration: sound.duration() || 0 });
          });
        });
      })
    );
    return durations;
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/Song/?_limit=20&_page=1")
      .then(async ({ data }) => {
        const current = await fetchAndLogDurations(data.data);
        const formattedSongs = current.map((item: any) => ({
          ...item,
          timing: SeconToMinuste(item.duration),
        }));
        setSong(formattedSongs);
        setLoading(true);
      });
  }, []);

  const handToggle = useCallback(
    (item: ifSong) => {
      const prevState = stateSong;
      localStorage.setItem("song", JSON.stringify(item));
      dispatch(setCurrentSong(item));
      if (prevState && currentSong?._id == item._id) {
        dispatch(setStateSong(false));
      } else {
        dispatch(setStateSong(true));
      }
    },
    [stateSong, dispatch]
  );

  return (
    <div className="container">
      <div className="chanel-section-title mt-[100px] pl-[60px] py-10 flex justify-between mb-[20px]">
        <h3 className="font-semibold capitalize text-white text-[40px]">
          Danh sách nhạc
        </h3>
      </div>
      {/* overflow-y-scroll */}
      <section className="music_charts min-h-[300px] px-10 overflow-y-hidden">
        {
          // 26B7E7
          loading ? (
            song.map((item: any, index: number) => {
              return (
                <div
                  className={`content rounded-md px-5 py-21 hover:cursor-default`}
                  key={index}
                >
                  <div
                    className={`item flex items-center space-x-5 border-b border-[#393243] hover:bg-[#14182A] ${
                      currentSong && item._id == currentSong._id
                        ? "bg-[#14182A]"
                        : ""
                    }`}
                  >
                    <div className="song group/play grid grid-cols-[35%50%5%] gap-x-5 py-2 w-full items-center hover:rounded-md">
                      <div className="image_song relative flex items-center space-x-3">
                        <span
                          className="relative group/play hover:cursor-pointer"
                          onClick={() => handToggle(item)}
                        >
                          {stateSong && currentSong?._id == item._id ? (
                            <IoPause class="absolute top-[30%] left-[30%] text-2xl text-white invisible group-hover/play:visible" />
                          ) : (
                            <IoIosPlay class="absolute top-[30%] left-[30%] text-2xl text-white invisible group-hover/play:visible" />
                          )}
                          <img
                            className="rounded-md w-[55px] h-[55px]"
                            src={`${item.song_image[0]}`}
                            alt=""
                          />
                        </span>
                        <div className="name_song min-w-[300px] space-y-1">
                          <p className=" text-[#3BC8E7]  font-semibold">
                            {item.song_name}
                          </p>
                          <p className="text-gray-500 font-semibold text-xs pb-2">
                            {item.id_Singer.name}
                          </p>
                        </div>
                      </div>
                      <div className="text-gray-500 font-semibold min-w-[300px] ">
                        <p className="text-sm">{item.id_Genre.name}</p>
                      </div>
                      <div className="time_song ">
                        <span className="text-right text-gray-500 font-semibold text-sm">
                          {item.timing}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <SkeletonDs />
          )
        }
      </section>
      {/* End .music_charts */}
    </div>
  );
};

export default DSong;
