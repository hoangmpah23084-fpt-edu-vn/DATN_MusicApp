import ClientSidebar from "@/components/SidebarMenu";
import type { FC } from "react";
import { Outlet } from "react-router-dom";
import { GrPrevious, GrNext } from "react-icons/gr";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import "./css.scss";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import SongCarouselItem from "@/components/Song-carousel-item";
import ListSongItem from "@/components/List-songs-item";
import BarChart from "@/components/Barchart";

// interface IImage = {}

const img_slide = [
  { id: 0, img: "/Image/b0fa9fbfce103d1dce15d73aaceb68be.jpg" },
  { id: 1, img: "/Image/e2917910851c112d22209b2aa8d6e9a9.jpg" },
  { id: 2, img: "/Image/eb585668066276c3f1bfe4e7cc9201c5.jpg" },
  { id: 3, img: "/Image/0ef8beec056970cb6e9596e056fa1c5a.jpg" },
  { id: 4, img: "/Image/3028cc8cbf4a8d9e519545f0a8b9f0c5.jpg" },
  { id: 5, img: "/Image/e663da1f89026b0e73a979ca67a5eb96.jpg" },
];

const KhamPhaPage = () => {
  return (
    <>
      <div className="zm-section">
        <main className="px-[59px] text-white">
          <div className="home-page-content mt-[70px]">
            <div className="container">
              <div className="gallery mx-[-15px] pt-[32px]">
                <div className="gallery-container flex relative">
                  <Swiper
                    modules={[Autoplay, Navigation]}
                    slidesPerView={3}
                    navigation
                    loop={true}
                    className="mySwiper"
                    autoplay={{
                      delay: 5000,
                    }}
                  >
                    {img_slide.map((slide) => {
                      return (
                        <SwiperSlide key={slide.id}>
                          <div className="gallery-item h-full">
                            <div className="zm-card h-full">
                              <Link to={`#`}>
                                <div className="card-image overflow-hidden rounded-[5px]h-full">
                                  <img src={slide.img} alt="" />
                                </div>
                              </Link>
                            </div>
                          </div>
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                </div>
              </div>

              <div className="playlist-section home-recent mt-12">
                <div className="home-recent-title flex justify-between mb-[20px]">
                  <h3 className="text-xl font-semibold capitalize">Gần đây</h3>
                  <Link
                    to={`#`}
                    className="text-[#ccc] uppercase text-xs font-light flex"
                  >
                    Tất cả
                    <GrNext />
                  </Link>
                </div>
                <div className="carousel-wrapper relative ">
                  <div className="carousel flex -mx-[15px] overflow-hidden">
                    <div className="carousel-container flex w-[100%]">
                      <SongCarouselItem />
                      <SongCarouselItem />
                      <SongCarouselItem />
                      <SongCarouselItem />
                      <SongCarouselItem />
                      <SongCarouselItem />
                      <SongCarouselItem />
                    </div>
                  </div>
                </div>
              </div>

              <div className="suggested-list-songs mt-12">
                <div className="suggested-list-songs-title flex flex-col justify-between mb-[20px]">
                  <h4 className="text-[rgb(140,136,146)] font-light flex">
                    Bắt đầu nghe từ một bài hát
                  </h4>
                  <h3 className="text-xl font-semibold capitalize">
                    Gợi ý từ nhạc bạn đã nghe
                  </h3>
                </div>
                <div className="column">
                  <div className="list grid grid-cols-3 -mx-[15px]">
                    <ListSongItem section="suggested" />
                    <ListSongItem section="suggested" />
                    <ListSongItem section="suggested" />
                    <ListSongItem section="suggested" />
                    <ListSongItem section="suggested" />
                    <ListSongItem section="suggested" />
                    <ListSongItem section="suggested" />
                    <ListSongItem section="suggested" />
                    <ListSongItem section="suggested" />
                  </div>
                </div>
              </div>

              <div className="playlist-section home-recent mt-12">
                <div className="home-recent-title flex justify-between mb-[20px]">
                  <h3 className="text-xl font-semibold capitalize">
                    Có thể bạn muốn nghe
                  </h3>
                </div>
                <div className="carousel-wrapper relative ">
                  <div className="carousel flex -mx-[15px] overflow-hidden">
                    <div className="carousel-container flex w-[100%]">
                      <SongCarouselItem />
                      <SongCarouselItem />
                      <SongCarouselItem />
                      <SongCarouselItem />
                      <SongCarouselItem />
                    </div>
                  </div>
                </div>
              </div>

              <div className="chanel-section mt-12 ">
                <div className="chanel-section-title flex justify-between mb-[20px]">
                  <h3 className="text-xl font-semibold capitalize">
                    BXH Nhạc mới
                  </h3>
                </div>
                <div className="column">
                  <div className="list grid grid-cols-3 -mx-[15px]">
                    <ListSongItem section="chanel" />
                    <ListSongItem section="chanel" />
                    <ListSongItem section="chanel" />
                  </div>
                </div>
              </div>

              <div className="chart-home relative mt-12 rounded-[8px] overflow-hidden p-[20px]">
                <div className="bg-blur"></div>
                <div className="bg-alpha"></div>
                <div className="header flex relative mb-[20px]">
                  <Link
                    to={"#"}
                    className="text-[28px] font-bold leading-normal normal-case bg-clip-text"
                  >
                    #zingchart
                  </Link>
                  <button>
                    <BsFillPlayCircleFill className="w-[44px] text-[25px]" />
                  </button>
                </div>
                <div className="column -mx-[15px] flex">
                  <div className="list w-[41.6%]">
                    <ListSongItem section="zingchart" />
                    <ListSongItem section="zingchart" />
                    <ListSongItem section="zingchart" />
                  </div>
                  <div className="zm-chart relative z-10 w-[58.3%]">
                    <div className="chart-container">
                      <BarChart/>
                    </div>
                  </div>
                </div>
              </div>

              <div className="week-chart mt-7">
                <div className="column">
                  <div className="list flex -mx-[15px] relative">
                    <div className="relative px-[15px] mb-8">
                      <div className="card">
                        <div className="card-image overflow-hidden rounded-[5px]">
                          <img src="./Image/song-vn-2x.jpg" alt="" />
                        </div>
                      </div>
                    </div>
                    <div className="relative px-[15px] mb-8">
                      <div className="card">
                        <div className="card-image overflow-hidden rounded-[5px]">
                          <img src="./Image/web_song_kpop.jpg" alt="" />
                        </div>
                      </div>
                    </div>
                    <div className="relative px-[15px] mb-8">
                      <div className="card">
                        <div className="card-image overflow-hidden rounded-[5px]">
                          <img src="./Image/web_song_usuk.jpg" alt="" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default KhamPhaPage;
