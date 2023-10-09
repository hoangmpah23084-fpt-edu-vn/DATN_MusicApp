import React from "react";
import { Link } from "react-router-dom";
import './index.scss'
type Props = {};

const SongCarouselItem = (props: Props) => {
  return (
    <div className="carousel-item flex flex-col px-[14px]">
      <div className="card">
        <div className="card-image">
          <Link to={`#`}>
            <img className="rounded-[6px]" src="./Image/35c4a097c0780f97c94bd50255cec667.jpg" />
          </Link>
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
