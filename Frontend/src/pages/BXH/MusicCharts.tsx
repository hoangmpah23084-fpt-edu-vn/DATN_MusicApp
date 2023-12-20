import ListSongItem from "@/components/List-songs-item";
import React, { useEffect, useState } from "react";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import BarChart from "@/components/Barchart";
import { handGetSong } from "@/store/Reducer/Song";
import { AiFillHeart } from "react-icons/ai";
import SuggSkeleton from "../KhamPha/Skeleton/Sugg.skeleton";

type Props = {};

const MusicCharts = (props: Props) => {
  const [listSong, setListSong] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);
    fetch("http://localhost:8080/api/Song?_order=desc&_limit=10")
      .then((response) => response.json())
      .then((data) => setListSong(data.data));
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container">
      <div className="chanel-section-title mt-[70px] md:mt-[100px] px-[15px] md:px-16 py-5 flex justify-between md:mb-[20px]">
        <h3 className="font-semibold capitalize text-white text-[22px] md:text-[40px]">
          BXH Nhạc yêu thích
        </h3>
      </div>
      <section className="music_charts min-h-[300px] px-[15px] md:px-10 space-y-4">
        <div className="content md:px-10 py-2 hover:cursor-default space-y-5">
          {loading
            ? listSong.map((_, index) => (
                <SuggSkeleton section="suggested" key={index} />
              ))
            : listSong?.map((song, index) => (
                <>
                  <div className="flex flex-col">
                    <div
                      key={index}
                      className="item flex items-center md:space-x-5 hover:bg-stone-700 hover:rounded-md py-[10px]"
                    >
                      <div className="text-white text-xl min-w-[30px] md:text-3xl md:min-w-[40px] font-bold text-center ">
                        <span className="">{index + 1}</span>
                      </div>
                      <div className="">
                        <span className="md:font-bold text-gray-400 text-4xl mr-[15px]">
                          -
                        </span>
                      </div>
                      <div className="song group/play flex justify-between gap-x-7 w-full items-center hover:bg-stone-700 hover:rounded-md">
                        <div className="image_song relative flex items-center md:space-x-3">
                          <Link
                            to={""}
                            className="relative group/play mr-[15px]"
                          >
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
                              src={song.song_image}
                              alt=""
                            />
                          </Link>
                          <div className="name_song md:min-w-[300px] md:space-y-1">
                            <p className=" text-white text-[14px] md:text-[18px] font-semibold">
                              {song.song_name}
                            </p>
                            <p className="text-gray-500 md:font-semibold text-[14px] md:text-[15px]">
                              {song.id_Singer.name}
                            </p>
                          </div>
                        </div>
                        {/* End .name_song */}
                        <div className="text-gray-500 font-semibold min-w-[300px] hidden md:block">
                          <p>{song?.id_Genre.name}</p>
                        </div>
                        <div className="time_song pr-[10px] hidden md:block">
                          <span className="text-right text-gray-500 font-semibold flex justify-center items-center gap-4">
                            {song?.total_like}
                            <AiFillHeart className="text-[#3bc8e7]  " />
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* <div className="block md:hidden">
                      <div className="text-gray-500 font-semibold ">
                        <p>{song?.id_Genre.name}</p>
                      </div>
                      <div className="time_song ">
                        <span className=" text-gray-500 font-semibold flex justify-center items-center gap-4">
                          {song?.total_like}
                          <AiFillHeart className="text-[#3bc8e7]  " />
                        </span>
                      </div>
                    </div> */}
                  </div>
                </>
              ))}
        </div>
      </section>
      {/* End .music_charts */}
    </div>
    // End .container
  );
};

export default MusicCharts;
