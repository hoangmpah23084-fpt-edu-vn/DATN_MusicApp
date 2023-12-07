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
import { Advertisement, BXHSong, HeardRecently, SuggestSong, WantToListent } from "./Component";

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
      <div className="zm-section bg-[#14182A]">
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
                  <h3 className="text-xl font-semibold capitalize ">Gần đây</h3>
                  <Link
                    to={`#`}
                    className="text-[#ccc] uppercase text-xs font-light flex"
                  >
                    Tất cả
                    <GrNext />
                  </Link>
                </div>
                
              {/* Start Component HeardRecently */}
              <HeardRecently />
              {/* End Component HeardRecently */}
              </div>
              {/* Start Component SuggestSong */}
              <SuggestSong />
              {/* End Component SuggestSong */}
              
              {/* Start Component WantToListent */}
              <WantToListent />
              {/* End Component WantToListent */}

              {/* Start Component WantToListent */}
              <BXHSong />
              {/* End Component WantToListent */}
             
              {/* Start Component WantToListent */}
              <Advertisement />
              {/* End Component WantToListent */}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default KhamPhaPage;
