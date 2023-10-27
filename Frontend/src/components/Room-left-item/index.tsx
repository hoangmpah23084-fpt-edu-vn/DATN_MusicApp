import React from "react";
import { BsFillPlayFill } from "react-icons/bs";
import "./css.scss";
type Props = {
  image?: string;
};

const RoomLeftItem = ({ image }: Props) => {
  return (
    <div>
      <div className="zm-card pt-[30px] transition duration-500 transform hover:translate-x-[20px] hover:scale-125">
        <div className="zm-card-content">
          <div className="top-content relative m-auto w-[48px] h-[48px] z-20">
            <div className="rounded-full border-2">
              <div className="w-full h-full relative ">
                <img
                  className="rounded-full h-[45px]"
                  src={`${image}`}
                  // src={`./Image/efb05fb9097a7057aecef6ecb62bff5a.jpg         
                  // `}
                  alt=""
                />
                <div className="opacity absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] rounded-full hidden"></div>
              </div>
            </div>
            <div className="action-play absolute w-full h-full top-0 hidden">
              <button className="flex justify-center items-center w-full h-full text-[35px]">
                <BsFillPlayFill />
              </button>
            </div>
          </div>
          <div className="bottom-content text-center mt-[8px]">
            <h3 className="title text-[12px]">V-POP</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomLeftItem;
