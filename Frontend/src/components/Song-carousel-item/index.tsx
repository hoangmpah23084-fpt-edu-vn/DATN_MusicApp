import { AiOutlineHeart } from "react-icons/ai";
import { BsThreeDots, BsFillPlayFill } from "react-icons/bs";
import {  AiOutlinePause } from "react-icons/ai";
import { Link } from "react-router-dom";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import "./index.scss";
import { ifSong } from "@/pages/Admin/Interface/ValidateSong";
type Props = {
  item : ifSong
};

const SongCarouselItem = ({item}: Props) => {
  return (
    <div className="carousel-item flex flex-col px-[14px]">
      <div className="card ">
        <div className="card-top relative">
          <div className="card-image overflow-hidden rounded-[6px] relative">
            <Link to={`#`} className="overflow-hidden">
              {<img
                className="rounded-[6px] aspect-square"
                src={item.song_image[0]}
              /> || <Skeleton />}
            </Link>
          </div>
          <div className="overlay absolute w-full h-full top-0 bg-[rgba(0,0,0,.4)] hidden"></div>
          <div className="action-container absolute w-full h-[40px] top-[50%] -translate-y-[50%] hidden">
            <div className="flex gap-[10px] h-full justify-center items-center">
              <div className="rounded-full">
                <button className="group relative flex justify-center items-center rounded-full px-[5px] ">
                  <AiOutlineHeart className="px-3 py-2 rounded-full text-[40px] hover:bg-[rgba(204,204,204,.2)] cursor-pointer hover:opacity-80 " />
                  <div className="absolute -top-5 right-[ưpx] text-xs px-[10px] py-[5px] bg-[#1e1e1e] text-center opacity-0 rounded-[5px] w-32 group-hover:opacity-100 group-hover:-top-[35px] ease-in-out duration-300">
                    <p className="text-white">Thêm vào thư viện</p>
                  </div>
                </button>
              </div>
              <div>
                <button className="border rounded-full">
                  {/* <AiOutlinePause className="text-[40px] p-1 pl-[6px]" /> */}
                  <BsFillPlayFill className="text-[40px] p-1 pl-[6px]" />
                </button>
              </div>
              <div className="rounded-full">
                <button className="group relative flex justify-center items-center rounded-full px-[5px] ">
                  <BsThreeDots className="px-2 py-2 rounded-full text-[40px] hover:bg-[rgba(204,204,204,.2)] cursor-pointer hover:opacity-80 " />
                  <div className="absolute -top-5 right-[ưpx] text-xs px-[10px] py-[5px] bg-[#1e1e1e] text-center opacity-0 rounded-[5px] group-hover:opacity-100 group-hover:-top-[35px] ease-in-out duration-300">
                    <p className="text-white">Khác</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="card-content mt-[12px]">
          <h4>
            <Link to={`#`}>
              <span className="text-[14px] font-semibold">
                Artist's Story #33 - Tăng Duy Tân: Viết nhạc để quên đi thực tại
                phũ phàng
              </span>
            </Link>
          </h4>
        </div>
      </div>
    </div>
  );
};

export default SongCarouselItem;
