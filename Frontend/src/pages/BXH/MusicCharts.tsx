import ListSongItem from "@/components/List-songs-item";
import React, { useEffect, useState } from "react";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import BarChart from "@/components/Barchart";
import { handGetSong } from "@/store/Reducer/Song";
import { AiFillHeart } from "react-icons/ai";
import SuggSkeleton from "../KhamPha/Skeleton/Sugg.skeleton";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { activeSong } from "@/constane/song.const";
import { setSingerSong } from "@/store/Reducer/Song";
import { ifSong } from "../Admin/Interface/ValidateSong";
import BXHItemSong from "@/components/BXHItemSong";

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
            : listSong?.map((song, index) => {
                return <BXHItemSong item={song} indexItem={index} key={index} />;
              })}
        </div>
      </section>
      {/* End .music_charts */}
    </div>
    // End .container
  );
};

export default MusicCharts;
