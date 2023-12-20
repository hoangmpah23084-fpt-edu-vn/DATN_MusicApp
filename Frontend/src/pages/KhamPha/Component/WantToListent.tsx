import SongCarouselItem from "@/components/Song-carousel-item";
import SongGenre from "@/components/SongGenre";
import { ifGenre } from "@/pages/Admin/Interface/validateAlbum";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import { Link } from "react-router-dom";
import "./scss.scss";
type Props = {};

const WantToListent = (props: Props) => {
  const [genre, setGenre] = useState<ifGenre[] | []>([]);
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/genre")
      .then(({ data }) => setGenre(data.data));
  }, []);

  return (
    <>
      <div className="playlist-section home-recent grid grid-cols-1 md:grid-cols-3 gap-4 my-[30px]">
        {genre.length > 0 &&
          genre.map((item) => {
            // const sliceItem = item.list_songs?.slice(0, 5);

            return (
              <Link
                to={`/genre/${item._id}`}
                className="text-xl font-semibold capitalize"
              >
                <div className="playlist-section home-recent flex justify-center items-center bg-[#d17975] rounded-md py-[20px]">
                  <div className="home-recent-title  justify-between ">
                    {item.name}
                  </div>
                </div>
              </Link>
            );
          })}
      </div>
    </>
  );
};

export default WantToListent;
