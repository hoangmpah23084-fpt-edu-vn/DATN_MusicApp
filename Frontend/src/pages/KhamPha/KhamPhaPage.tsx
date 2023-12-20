import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import "./css.scss";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import { Advertisement, SuggestSong, WantToListent } from "./Component";
import { useEffect, useState } from "react";
import ListSongItem from "@/components/List-songs-item";
import { ifSong } from "../Admin/Interface/ValidateSong";
import SuggSkeleton from "./Skeleton/Sugg.skeleton";
import SongGenre from "@/components/SongGenre";
import Album from "../../components/Album/index.tsx";
import { MdArrowForwardIos } from "react-icons/md";
import ListAlbum from "./Component/ListAlbum.tsx";

const img_slide = [
  { id: 0, img: "/Image/b0fa9fbfce103d1dce15d73aaceb68be.jpg" },
  { id: 1, img: "/Image/e2917910851c112d22209b2aa8d6e9a9.jpg" },
  { id: 2, img: "/Image/eb585668066276c3f1bfe4e7cc9201c5.jpg" },
  { id: 3, img: "/Image/0ef8beec056970cb6e9596e056fa1c5a.jpg" },
  { id: 4, img: "/Image/3028cc8cbf4a8d9e519545f0a8b9f0c5.jpg" },
  { id: 5, img: "/Image/e663da1f89026b0e73a979ca67a5eb96.jpg" },
];

const KhamPhaPage = () => {
  const [historySongState, setHistorySongState] = useState<ifSong[]>();
  const historySong = localStorage.getItem("history");
  const [loading, setLoading] = useState(true);
  const [listAlbum, setListAlbum] = useState([]);

  useEffect(() => {
    setLoading(true);
    if (historySong) {
      const parsedHistory = JSON.parse(historySong) as ifSong[];
      if (parsedHistory) {
        const newData = parsedHistory.map((item: any) => JSON.parse(item));
        setHistorySongState([...newData]);
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }
    }
    fetch("http://localhost:8080/api/album")
      .then((response) => response.json())
      .then(({ data }) => {
        const album = data.slice(0, 5);

        setListAlbum(album);
      });
  }, [historySong]);

  return (
    <>
      <div className="zm-section bg-[#14182A]">
        <main className="px-[15px] md:px-[59px] text-white">
          <div className="home-page-content mt-[70px]">
            <div className="container">
              <div className="gallery mx-[-15px] pt-[32px]">
                <div className="gallery-container flex relative">
                  <Swiper
                    modules={[Autoplay, Navigation]}
                    slidesPerView={1}
                    navigation
                    loop={true}
                    className="mySwiper"
                    autoplay={{
                      delay: 5000,
                    }}
                    breakpoints={{
                      768: {
                        slidesPerView: 2,
                      },
                      1024: {
                        slidesPerView: 3,
                      },
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
                  {historySongState && (
                    <h3 className="text-xl font-semibold capitalize ">
                      Gần đây
                    </h3>
                  )}
                </div>
                {/* Start Component HeardRecently */}
                <div className="column">
                  <div className="list grid grid-cols-1 md:grid-cols-3 -mx-[15px]">
                    {loading
                      ? historySongState?.map((_, index) => (
                          <SuggSkeleton section="suggested" key={index} />
                        ))
                      : historySongState?.map((item, index) => (
                          <ListSongItem
                            item={item}
                            section="suggested"
                            key={index}
                          />
                        ))}
                  </div>
                </div>
                {/* End Component HeardRecently */}
              </div>
              {/* Start Component SuggestSong */}
              <SuggestSong />
              {/* End Component SuggestSong */}

              {/* Album */}
              <ListAlbum/>
              

              {/* Start Component WantToListent */}
              <WantToListent />
              {/* End Component WantToListent */}

              {/* Start Component WantToListent */}
              {/* <BXHSong /> */}
              {/* End Component WantToListent */}

              {/* Start Component WantToListent */}
              {/* <Advertisement /> */}
              {/* End Component WantToListent */}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default KhamPhaPage;
