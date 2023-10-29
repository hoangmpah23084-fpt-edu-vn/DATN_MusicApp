

import { ifSong } from "@/pages/Admin/Interface/ValidateSong";
import { useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"



type props = {
  item: ifSong
}

export const ActiveFavourites = ({ item }: props) => {
  const { listFavourites } = useAppSelector((state: RootState) => state.favourites);
  const active = listFavourites.map((item) => item._id).includes(item._id)
  return (
    <>
      {active ? <AiFillHeart className="text-[20px] text-[#9b4de0] scale-90 ease-in-out duration-300" /> :
        <AiOutlineHeart className="text-[20px] text-white ease-in-out duration-300" />}
    </>
  )
}



