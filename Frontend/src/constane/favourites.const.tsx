

import { ifSong } from "@/pages/Admin/Interface/ValidateSong";
import { checkToken } from "@/store/Reducer/User";
import { addFavourite, getFavourite } from "@/store/Reducer/favouriteReducer";
import { useAppSelector } from "@/store/hooks";
import { AppDispatch, RootState } from "@/store/store";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"
import { toast } from "react-toastify";



type props = {
  item: ifSong,
}

export const ActiveFavourites = ({ item }: props) => {
  const { listFavourites } = useAppSelector((state: RootState) => state.favourites);
  const active = listFavourites.map((item) => item?._id).includes(item?._id)
  return (
    <>
      {active ? <AiFillHeart className="text-[20px] text-[#3BC8E7] scale-90 ease-in-out duration-300" /> :
        <AiOutlineHeart className="text-[20px] text-white ease-in-out duration-300" />}
    </>
  )
}

export const onhandleFavourite = async (dispatch: AppDispatch, id_song: string, token: string) => {
  try {
    if (token) {
      const resp: any = await dispatch(addFavourite(id_song))
      await dispatch(getFavourite())
      toast.success(resp.payload.message)
    } else {
      dispatch(checkToken(true))
    }
  } catch (error) {
    toast.error(error as string)
  }
}



