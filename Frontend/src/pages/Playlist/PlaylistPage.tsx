import SongCarouselItem from "@/components/Song-carousel-item";
import React from "react";
import { BsThreeDots, BsFillPlayFill } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import "./css.scss";
import ListSong from "@/components/ListSong";
type Props = {};

const PlaylistPage = (props: Props) => {
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
                      <img
                        className="rounded-[8px] aspect-square"
                        src="/Image/35c4a097c0780f97c94bd50255cec667.jpg"
                      />
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
                          <BsFillPlayFill className="text-[40px] p-1 pl-[6px]" />
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
                      Artist's Story #33 - Tăng Duy Tân: Viết nhạc để quên đi
                      thực tại phũ phàng
                    </h3>
                    <div className="release text-[12px] leading-7 text-[rgba(255,255,255,.5)]">
                      Cập nhật: 13/10/2023
                    </div>
                    <div className="artists text-[12px] leading-7 text-[rgba(255,255,255,.5)]">
                      <a className="is-ghost">Tăng Duy Tân</a>
                    </div>
                    <div className="like text-[12px] leading-7 text-[rgba(255,255,255,.5)]">
                      204K người yêu thích
                    </div>
                  </div>
                  <div className="actions flex flex-col items-center justify-center">
                    <button className="flex bg-[#9b4de0] items-center rounded-[25px] my-[20px] px-[20px] py-[5px]">
                      <BsFillPlayFill className='text-[25px]'/>
                      <span className="uppercase text-[14px] font-light">Tiếp tục phát</span>
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
                <ListSong />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PlaylistPage;
