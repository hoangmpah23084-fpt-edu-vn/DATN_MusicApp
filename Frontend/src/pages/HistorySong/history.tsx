import { useEffect, useState } from "react";
import { ifSong } from "../Admin/Interface/ValidateSong";
import SuggSkeleton from "../KhamPha/Skeleton/Sugg.skeleton";
import ItemSong from "@/components/Favourites/ItemSong";

const HistorySong = () => {
  const [historySongState, setHistorySongState] = useState<ifSong[]>();
  const historySong = localStorage.getItem("history");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    if (historySong) {
      const parsedHistory = JSON.parse(historySong) as ifSong[];
      if (parsedHistory) {
        const newData = parsedHistory.map((item: any) => JSON.parse(item));
        setHistorySongState([...newData]);
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }
    }
  }, [historySong]);
  return (
    <div className="text-white relative w-full">
      <div className="px-[15px] md:px-16 mt-[70px]">
        <h1 className="flex items-center text-[25px] font-bold mt-20">
          Nghe gần đây{" "}
        </h1>
        <table className="w-full text-sm text-left mt-[20px]">
          {loading
            ? historySongState?.map((_, index) => (
                <SuggSkeleton section="suggested" key={index} />
              ))
            : historySongState?.map((item, index) => (
                <ItemSong item={item} key={index} />
              ))}
        </table>
      </div>
    </div>
  );
};

export default HistorySong;
