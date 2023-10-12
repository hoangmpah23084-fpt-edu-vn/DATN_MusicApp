import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { BsThreeDots, BsFillPlayFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import "./index.scss";
type Props = {};

const SongCarouselItem = (props: Props) => {
  return (
    <div className="carousel-item flex flex-col px-[14px]">
      <div className="card">
        <div className="card-image overflow-hidden rounded-[6px] relative">
          <Link to={`#`}>
            <img
              className="rounded-[6px]"
              src="./Image/35c4a097c0780f97c94bd50255cec667.jpg"
            />
          </Link>
          <div className="overlay absolute w-full h-full top-0 bg-[#ccc] hidden"></div>
          <div className="action-container absolute w-full h-[40px] top-[50%] -translate-y-[50%] hidden">
            <div className="flex gap-[20px] h-full justify-center items-center">
              <div className="btn-hear rounded-full p-1">
                <div>
                  <AiOutlineHeart className="text-[21px]" />
                </div>
              </div>

              <div>
                <div className="border rounded-full">
                  <BsFillPlayFill className="text-[40px] p-1 pl-[6px]" />
                </div>
              </div>

              <div className="btn-hear rounded-full p-1">
                <div>
                  <BsThreeDots className="text-[22px]" />
                </div>
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
