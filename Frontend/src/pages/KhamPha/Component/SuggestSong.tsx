import ListSongItem from "@/components/List-songs-item";
import { useEffect, useState } from "react";
import { MdArrowForwardIos } from "react-icons/md";
import SuggSkeleton from "../Skeleton/Sugg.skeleton";
import axios from "axios";
import { ifSong } from "@/pages/Admin/Interface/ValidateSong";
import { Link } from "react-router-dom";

type Props = {};

const SuggestSong = (props: Props) => {
  const [loading, setLoading] = useState(true);
  const [songData, setTopSong] = useState<ifSong[] | []>([]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);
    axios
      .get(
        `http://localhost:8080/api/Song/?_limit=9&_page=1&_sort=view_song&_order=desc`
      )
      .then(({ data }) => {
        setTopSong(data.data);
      });
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="suggested-list-songs mt-12">
      <div className="suggested-list-songs-title flex items-centera justify-between mb-[20px]">
        <div>
          {" "}
          <h4 className="text-[rgb(140,136,146)] font-light flex">
            Bắt đầu nghe từ một bài hát
          </h4>
          <h3 className="text-xl font-semibold capitalize ">
            {/* Top bài nhạc thịnh hành */}
            Có Thể Bạn Muốn Nghe
          </h3>
        </div>
        <div className="flex justify-center items-center px-2 text-[#ffffff80] hover:text-[#3BC8E7] cursor-pointer">
          <Link to={"/dsong"} className="flex">
            <span className="pr-3 text-sm">TẤT CẢ</span>
            <MdArrowForwardIos className="text-sm" />
          </Link>
        </div>
      </div>
      <div className="column">
        <div className="list grid grid-cols-1 md:grid-cols-3 -mx-[15px]">
          {loading
            ? songData.map((_, index) => (
                <SuggSkeleton section="suggested" key={index} />
              ))
            : songData.map((item, index) => (
                <ListSongItem item={item} section="suggested" key={index} />
              ))}
        </div>
      </div>
    </div>
  );
};

export default SuggestSong;
