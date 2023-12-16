import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Link, useParams } from "react-router-dom";
import { AiOutlineHeart, AiOutlinePause } from "react-icons/ai";
import { BsThreeDots, BsFillPlayFill } from "react-icons/bs";
import { handChangeStateSong } from "@/store/Reducer/currentSong";
import { useEffect, useState } from "react";
import { handleGetOne } from "@/store/Reducer/singerReducer";
import { RootState } from "@/store/store";
import { ifSong } from "../Admin/Interface/ValidateSong";
import ItemSong from "@/components/Favourites/ItemSong";
import { getOneGenre } from "@/store/Reducer/genreReducer";
import axios from "axios";
import { ifGenre } from "../Admin/Interface/validateAlbum";
import SongGenre from "@/components/SongGenre";
import ListSongItem from "@/components/List-songs-item";

const DetailGenre = () => {
  const [genre, setGenre] = useState<ifGenre[] | []>([]);
  const param = useParams();
  const id = param.id;
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/genre/${id}`)
      .then(({ data }) => setGenre(data.data));
  }, []);
  //   console.log(genre);
  return (
    <>
      <div className="playlist-section home-recent mt-[70px]">
        <div className="carousel-wrapper relative ">
          <div className="carousel flex -mx-[15px] overflow-hidden px-[15px] text-[#fff]">
            <div className="carousel-container w-full px-[15px] md:px-[59px] flex flex-col">
              <div className="text-[40px] font-bold py-5">{genre?.name}</div>
              {/* {genre?.list_songs?.map((item) => item.name)} */}
              <div className="grid grid-cols-5 gap-4 py-5">
                {genre?.list_songs?.map((itemList) => (
                  <SongGenre item={itemList} />
                  // <ListSongItem item={itemList}  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailGenre;
