import { useEffect, useState } from "react";
import { BsThreeDots, BsFillPlayFill } from "react-icons/bs";
import { AiOutlineHeart, AiOutlinePause } from "react-icons/ai";
import { Link, useParams } from "react-router-dom";
import "./css.scss";
import ListSong from "@/components/Favourites/ListSong";
import { getOneAlbum } from "@/store/Reducer/albumReducer";
import { ifAlbum } from "../Admin/Interface/validateAlbum";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setCurrentSong,
  setStateSong,
} from "@/store/Reducer/currentSong";
import { toast } from "react-toastify";
import { getPlaylist } from "@/store/Reducer/playlistReducer";
import moment from "moment";
import { setSongFavourite } from "@/store/Reducer/Song";

const PlaylistPage = () => {
  const { id } = useParams<{ id?: string }>();
  const currentSong = useAppSelector(({ currentSong }) => currentSong);
  const playlistDetail = useAppSelector(({ playlist }) => playlist);
  const [album, setAlbum] = useState<ifAlbum | null>(null);
  const dispatch = useAppDispatch();
  useEffect(() => {
    id &&
      getOneAlbum(id as string)
        .then(({ data }) => {
          setAlbum(data);
          dispatch(setStateSong(false));
          dispatch(setCurrentSong(data.list_song[0]));
          setTimeout(() => dispatch(setStateSong(true)), 500);
        })
        .catch((error) => console.error(error));
  }, [id]);

  const handToggSong = () => {
    const state = currentSong.stateSong;
    dispatch(setStateSong(!state));
    dispatch(setSongFavourite(playlistDetail.playlistDetail?.list_song))
  };

  const fetchData = async () => {
    try {
      dispatch(getPlaylist(id as string));
    } catch (error) {
      toast.error(error as any);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="zm-section">
      <main className="px-[59px] text-white">
        <div className="playlist-content mt-[70px]">
          <div className="container pt-[20px]">
            <div className="pt-[20px]">
              <div className="playlist-header block w-[300px] float-left sticky top-[110px]">
                <div className="media-left relative">
                  <div className="card-image overflow-hidden rounded-[6px] relative">
                    <Link
                      to={`#`}
                      className="overflow-hidden w-[300px] h-[300px]"
                    >
                      <div className="rounded-[5px] overflow-hidden max-w-[350px] max-h-[350px] room-item--img relative">
                        {playlistDetail.playlistDetail?.list_song?.length >
                          3 ? (
                          <div className="grid grid-cols-2">
                            <div>
                              <img
                                src={
                                  playlistDetail.playlistDetail?.list_song[0]
                                    ?.song_image[0]
                                }
                                alt=""
                              />
                            </div>
                            <div>
                              <img
                                src={
                                  playlistDetail.playlistDetail?.list_song[1]
                                    ?.song_image[0]
                                }
                                alt=""
                              />
                            </div>
                            <div>
                              <img
                                src={
                                  playlistDetail.playlistDetail?.list_song[2]
                                    ?.song_image[0]
                                }
                                alt=""
                              />
                            </div>
                            <div>
                              <img
                                src={
                                  playlistDetail.playlistDetail?.list_song[3]
                                    ?.song_image[0]
                                }
                                alt=""
                              />
                            </div>
                          </div>
                        ) : playlistDetail.playlistDetail?.list_song?.length >=
                          1 ? (
                          <div>
                            <img
                              className="w-full h-full"
                              src={
                                playlistDetail.playlistDetail?.list_song[0]
                                  .song_image[0]
                              }
                              alt=""
                            />
                          </div>
                        ) : (
                          <div>
                            <img
                              className="w-full h-full opacity-[0.7]"
                              src="https://media.istockphoto.com/id/1175435360/vi/vec-to/bi%E1%BB%83u-t%C6%B0%E1%BB%A3ng-ghi-ch%C3%BA-nh%E1%BA%A1c-minh-h%E1%BB%8Da-vect%C6%A1.jpg?s=612x612&w=0&k=20&c=3w_KqtRKtiQ_Dgwy0pqGrx8ys4WkktOSSfjS36VI10A="
                              alt=""
                            />
                          </div>
                        )}
                      </div>
                    </Link>
                  </div>

                  <div className="overlay absolute w-full h-full top-0 bg-[rgba(0,0,0,.4)] hidden"></div>

                  <div className="action-container absolute w-full h-[40px] top-[50%] -translate-y-[50%] hidden">
                    <div className="flex gap-[10px] h-full justify-center items-center">
                      <div className="rounded-full">
                        {/* <button className="group relative flex justify-center items-center rounded-full px-[5px] ">
                          <AiOutlineHeart className="px-3 py-2 rounded-full text-[40px] hover:bg-[rgba(204,204,204,.2)] cursor-pointer hover:opacity-80 " />
                          <div className="absolute -top-5 right-[ưpx] text-xs px-[10px] py-[5px] bg-[#1e1e1e] text-center opacity-0 rounded-[5px] w-32 group-hover:opacity-100 group-hover:-top-[35px] ease-in-out duration-300">
                            <p className="text-white">Thêm vào thư viện</p>
                          </div>
                        </button> */}
                      </div>

                      <div>
                        <button className="border rounded-full">
                          {currentSong ? (
                            <AiOutlinePause className="text-[40px] p-1 pl-[6px]" />
                          ) : (
                            <BsFillPlayFill className="text-[40px] p-1 pl-[6px]" />
                          )}
                        </button>
                      </div>

                      {/* <div className="rounded-full">
                        <button className="group relative flex justify-center items-center rounded-full px-[5px] ">
                          <BsThreeDots className="px-2 py-2 rounded-full text-[40px] hover:bg-[rgba(204,204,204,.2)] cursor-pointer hover:opacity-80 " />
                          <div className="absolute -top-5 right-[ưpx] text-xs px-[10px] py-[5px] bg-[#1e1e1e] text-center opacity-0 rounded-[5px] group-hover:opacity-100 group-hover:-top-[35px] ease-in-out duration-300">
                            <p className="text-white">Khác</p>
                          </div>
                        </button>
                      </div> */}
                    </div>
                  </div>
                </div>

                <div className="media-content text-center mt-[12px]">
                  <div className="content-top">
                    <h3 className="title text-[20px] font-semibold">
                      {playlistDetail.playlistDetail?.playlist_name}
                    </h3>
                    <div className="release text-[12px] leading-7 text-[rgba(255,255,255,.5)]">
                      Tạo bởi:{" "}
                      {playlistDetail.playlistDetail?.id_user?.fullName}
                    </div>
                    {/* <div className="artists text-[12px] leading-7 text-[rgba(255,255,255,.5)]">
                      <a className="is-ghost">Tăng Duy Tân</a>
                    </div> */}
                    <div className="release text-[12px] leading-7 text-[rgba(255,255,255,.5)]">
                      Ngày tạo:{" "}
                      {moment(playlistDetail.playlistDetail?.createdAt).format(
                        "DD-MM-YYYY"
                      )}
                    </div>
                  </div>
                  <div className="actions flex flex-col items-center justify-center">
                    <button
                      className="flex bg-[#3BC8E7] items-center rounded-[25px] my-[20px] px-[20px] py-[5px]"
                      onClick={handToggSong}
                    >
                      {currentSong.stateSong ? (
                        <AiOutlinePause className="text-[25px] font-black pr-1" />
                      ) : (
                        <BsFillPlayFill className="text-[25px] pr-1" />
                      )}
                      <span className="uppercase text-[14px] font-normal">
                        {currentSong.stateSong ? "Dừng Phát" : "Tiếp tục phát"}{" "}
                      </span>
                    </button>
                    <div className="flex">
                      <button className="group relative flex justify-center items-center rounded-full px-[5px] ">
                        <AiOutlineHeart className="px-3 py-2 rounded-full text-[40px] bg-[rgba(204,204,204,.2)] cursor-pointer hover:opacity-80 " />
                        <div className="absolute -top-5 right-[ưpx] text-xs px-[10px] py-[5px] bg-[#1e1e1e] text-center opacity-0 rounded-[5px] w-32 group-hover:opacity-100 group-hover:-top-[35px] ease-in-out duration-300">
                          <p className="text-white">Thêm vào thư viện</p>
                        </div>
                      </button>

                      {/* <div className="rounded-full"> */}
                      <button className="group relative flex justify-center items-center rounded-full px-[5px] ">
                        <BsThreeDots className="px-2 py-2 rounded-full text-[40px] bg-[rgba(204,204,204,.2)] cursor-pointer hover:opacity-80 " />
                        <div className="absolute -top-5 right-[ưpx] text-xs px-[10px] py-[5px] bg-[#1e1e1e] text-center opacity-0 rounded-[5px] group-hover:opacity-100 group-hover:-top-[35px] ease-in-out duration-300">
                          <p className="text-white">Khác</p>
                        </div>
                      </button>
                      {/* </div> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="playlist-content ml-[330px]">
                <ListSong listSong={playlistDetail.playlistDetail?.list_song} activePlaylist={true} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PlaylistPage;
