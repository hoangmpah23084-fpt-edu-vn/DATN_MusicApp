import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { BsThreeDots, BsFillPlayFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import "./css.scss";

type Props = {
  section?: string;
};

const  ListSongItem = ({ section }: Props) => {
  return (
    <div className="list-items px-[15px]">
      <div
        className={`media flex items-center py-[10px] px-[15px] rounded-[5px] text-left hover:bg-[#2f2739] relative z-10 ${
          section === "chanel" && "bg-[#2f2739]"
        }  ${
          section === "zingchart" && "bg-[#492761] mb-[10px] hover:bg-[#65487a]"
        }`}
      >
        <div className="media-left flex flex-row grow shrink w-[50%] mr-[10px]">
          <div
            className={`song-prefix ${
              (section === "zingchart" && "block") || "hidden"
            } flex items-center`}
          >
            <span className="number is-top-1 mr-[15px]">1</span>
          </div>

          <div className="song-thumb block relative shrink-0 overflow-hidden cursor-pointer mr-[10px]">
            <div
              className={`${
                section === "chanel" && "card-image"
              } overflow-hidden relative rounded-[5px]`}
            >
              <img
                className={`rounded-[5px] ${
                  section === "suggested" && "w-[60px] h-[60px]"
                } ${section === "zingchart" && "w-[60px] h-[60px]"} ${
                  section === "chanel" && "w-[120px] h-[120px]"
                }`}
                src="./Image/6974fd1ab921429cc4f4d14564269660.jpg"
                alt=""
              />
              <div className="overlay absolute w-full h-full top-0 bg-[rgba(0,0,0,.4)] hidden"></div>
              <div className="action-container absolute w-full h-[40px] top-[50%] -translate-y-[50%] hidden">
                <div className="flex gap-[20px] h-full justify-center">
                  <div>
                    <div
                      className={`${
                        section === "chanel" && "border rounded-full"
                      }`}
                    >
                      <BsFillPlayFill className="text-[40px] p-1 pl-[6px]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`${
              (section === "chanel" && "justify-between") || "justify-center"
            } card-title flex flex-col grow shrink relative`}
          >
            <div>
              <div className="capitalize text-[15px]">
                <span>Chài Điếp Noọng (Anh Yêu Em)</span>
              </div>
              <div className="text-[rgb(140,136,146)] text-[12px] hover:text-[#c273ed] hover:underline">
                <Link to={`#`}>Double2T, Hoà Minzy, DuongK</Link>
              </div>
            </div>
            <div
              className={`${
                (section === "chanel" && "block") || "hidden"
              } flex justify-between`}
            >
              <span className="order ">#1</span>
              <span className="release-date text-[14px] text-[rgb(140,136,146)] absolute bottom-0 right-0 leading-[1.8]">
                05.10.2023
              </span>
            </div>
          </div>
        </div>

        <div
          className={`media-right ${
            (section === "suggested" && "block") || "hidden"
          }  ml-[10px]`}
        >
          <div className="hover-items hidden relative z-10">
            <div className="level flex">
              <button className="group flex justify-center items-center rounded-full px-[5px] ">
                <AiOutlineHeart className="px-3 py-2 rounded-full text-[40px] hover:bg-[rgba(204,204,204,.2)] cursor-pointer hover:opacity-80 " />
                <div className="absolute -top-5 -left-9 text-xs w-32 px-[10px] py-[5px] bg-gray-600 text-center rounded-[5px] opacity-0 group-hover:-top-[35px] group-hover:opacity-100 ease-in-out duration-300">
                  <p className="text-white">Xóa khỏi thư viện</p>
                </div>
              </button>
              <button className="group relative flex justify-center items-center rounded-full px-[5px] ">
                <BsThreeDots className="px-3 py-2 rounded-full text-[40px] hover:bg-[rgba(204,204,204,.2)] cursor-pointer hover:opacity-80 " />
                <div className="absolute -top-5 right-[ưpx] text-xs px-[10px] py-[5px] bg-gray-600 text-center opacity-0 rounded-[5px] group-hover:opacity-100 group-hover:-top-[35px] ease-in-out duration-300">
                  <p className="text-white">Khác</p>
                </div>
              </button>
            </div>
          </div>
        </div>

        <div
          className={`media-right ${
            (section === "zingchart" && "block") || "hidden"
          }`}
        >
          <span className="font-bold">26%</span>
        </div>
      </div>
    </div>
  );
};

export default ListSongItem;
