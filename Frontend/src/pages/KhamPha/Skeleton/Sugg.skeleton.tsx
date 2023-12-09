import React, { useState } from 'react'
import { BsFillPlayFill, BsThreeDots } from 'react-icons/bs';
import { Link } from 'react-router-dom';

type Props = {
    section?: string;
  };

const SuggSkeleton = ({section} : Props) => {


  return (
    <div className="list-items px-[15px]">
    <div
      className={`media flex animate-pulse items-center py-[10px] px-[15px] rounded-[5px] text-left relative z-10 ${
        section === "chanel" && "bg-[#14182A]"
      }  ${
        section === "zingchart" && "bg-[#14182A] mb-[10px]"
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
            {/* bg-[#20182D] */}
            <div className={`bg-[#352849] rounded-[5px] ${
                section === "suggested" && "w-[60px] h-[60px]"
              } ${section === "zingchart" && "w-[60px] h-[60px]"} ${
                section === "chanel" && "w-[120px] h-[120px]"
              }`}></div>
            <div className="overlay absolute w-full h-full top-0 bg-[rgba(0,0,0,.4)] hidden"></div>
          </div>
        </div>

        <div
          className={`${
            (section === "chanel" && "justify-between") || "justify-center"
          } card-title flex flex-col grow shrink relative`}
        >
          <div>
            <div className="capitalize w-full h-[12px] rounded-lg bg-[#352849]"></div>
            <div className="w-1/3 h-[12px] bg-[#352849] rounded-lg mt-3"></div>
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
          (section === "zingchart" && "block") || "hidden"
        }`}
      >
        <span className="font-bold">26%</span>
      </div>
    </div>
  </div>
  )
}

export default SuggSkeleton