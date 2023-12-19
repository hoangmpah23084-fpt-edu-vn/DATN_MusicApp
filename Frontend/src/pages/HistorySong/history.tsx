import { useEffect, useState } from "react";
import { ifSong } from "../Admin/Interface/ValidateSong";
import SuggSkeleton from "../KhamPha/Skeleton/Sugg.skeleton";
import ItemSong from "@/components/Favourites/ItemSong";

const HistorySong = () => {
    const [historySongState, setHistorySongState] = useState<ifSong[]>()
    const historySong = localStorage.getItem('history')
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setLoading(true)
        if (historySong) {
            const parsedHistory = JSON.parse(historySong) as ifSong[];
            if (parsedHistory) {
                const newData = parsedHistory.map((item: any) => (JSON.parse(item)))
                setHistorySongState([...newData])
                setTimeout(() => {
                    setLoading(false)
                }, 100);
            }
        }
    }, [historySong]);
    return (
        <div className="text-white relative w-full">
            <h1 className="flex items-center text-[25px] font-bold mx-16 mt-20">Nghe gần đây </h1>
            <table className="w-full text-sm text-left">
                {
                    loading ? (historySongState?.map((_, index) => <SuggSkeleton section="suggested" key={index} />)) : (historySongState?.map((item, index) => <ItemSong item={item} key={index} activeHistory={true} />))
                }
            </table>

        </div>
    )
}

export default HistorySong