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
import './scss.scss'
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
      {genre.length > 0 &&
        genre.map((item) => {
          const sliceItem = item.list_songs?.splice(0, 5);
          return (
            <div className="playlist-section home-recent mt-12">
              <div className="home-recent-title flex justify-between mb-[20px]">
                <h3 className="text-xl font-semibold capitalize">
                  {item.name}
                </h3>
              </div>
              <div className="carousel-wrapper relative ">
                <div className="carousel flex -mx-[15px] overflow-hidden px-[15px]">
                  <div className="carousel-container w-full grid grid-rows-1 grid-flow-col gap-4 px-[15px]">
                    {sliceItem?.map((itemList, index) => (
                      <SongGenre item={itemList} key={index} />
                    ))}
                  </div>

                  {/* <div className="block md:hidden">
                    <Swiper
                      modules={[Autoplay, Navigation]}
                      slidesPerView={2}
                      // navigation
                      loop={true}
                      className="mySwiper"
                      // autoplay={{
                      //   delay: 5000,
                      // }}
                    >
                      {sliceItem?.map((slide) => {
                        return (
                          <SwiperSlide key={slide._id}>
                              <div className="zm-card h-full">
                                <Link to={`/`} className="">
                                  <div className="card-image overflow-hidden rounded-[5px]">
                                    <img
                                      className="rounded-[6px] aspect-square "
                                      src={`${slide.song_image[0]}`}
                                    />
                                  </div>
                                </Link>
                              </div>
                            
                          </SwiperSlide>
                        );
                      })}
                    </Swiper>
                  </div> */}
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default WantToListent;
