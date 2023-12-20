import React, { useEffect, useState } from "react";

import { AiOutlinePlusCircle } from "react-icons/ai";

import { BsPlayCircle } from "react-icons/bs";

import { BiX } from "react-icons/bi";
import { BiDotsHorizontalRounded } from "react-icons/bi";

const Album = () => {
  const [listAlbum, setListAlbum] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8080/api/album")
      .then((response) => response.json())
      .then((data) => setListAlbum(data.data));
  }, []);
  console.log(listAlbum);

  return (
    <div className="text-white w-full h-[100%]">
      <div className="px-[15px] md:px-16 mt-[70px]">
        <h1 className="flex items-center text-[40px] font-bold pt-5">
          Album{" "}
          <span className="ml-2 mt-1 hover:opacity-70 cursor-pointer ease-in-out duration-300"></span>
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-9 mt-[20px]">
          {listAlbum?.map((item) => {
            return (
              <div className="">
                <div className="flex flex-col">
                  <div className="relative overflow-hidden rounded-md group">
                    <img
                      className="w-[100%] rounded-md transition duration-300 ease-in-out transform group-hover:scale-110 aspect-square"
                      src={`${item?.id_singer?.images[0]}`}
                      alt=""
                    />
                    <p className="text-4xl flex gap-5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out text-white ">
                      <span className="text-white">
                        <BiX />
                      </span>
                      <span className="text-white">
                        <BsPlayCircle />
                      </span>
                      <span className="text-white">
                        <BiDotsHorizontalRounded />
                      </span>
                    </p>
                  </div>
                  <p className="text-white font-medium text-sm mt-1">{item?.album_name}</p>
                  <p className="text-[#8B8791] text-xs">Zing MP3</p>
                </div>
              </div>
            );
          })}

         
        </div>
      </div>
    </div>
  );
};

export default Album;
