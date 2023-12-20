import Album from "@/components/Album";
import React, { useEffect, useState } from "react";
import { MdArrowForwardIos } from "react-icons/md";
import { Link } from "react-router-dom";

type Props = {};

const ListAlbum = (props: Props) => {
  const [listAlbum, setListAlbum] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/album")
      .then((response) => response.json())
      .then(({ data }) => {
        const album = data.slice(0, 5);
        setListAlbum(album);
      });
  }, []);
  return (
    <div className="mt-12">
      <div className="suggested-list-songs-title flex items-center justify-between mb-[20px]">
        <div>
          {" "}
          <h3 className="text-xl font-semibold capitalize ">
            {/* Top bài nhạc thịnh hành */}
            Danh sách Album
          </h3>
        </div>
        <div className="flex justify-center items-center px-2 text-[#ffffff80] hover:text-[#3BC8E7] cursor-pointer">
          <Link to={"/album"} className="flex">
            <span className="pr-3 text-sm">TẤT CẢ</span>
            <MdArrowForwardIos className="text-sm" />
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-5 gap-4 py-5">
        {listAlbum?.map((item) => {
          return <Album item={item} />;
        })}
      </div>
    </div>
  );
};

export default ListAlbum;
