

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
  const active = listFavourites?.map((item) => item?._id).includes(item?._id)
  return (
    <>
      {active ? <AiFillHeart className="text-[#3bc8e7] scale-90 ease-in-out duration-300 px-3 py-2 rounded-full text-[45px] hover:bg-[rgba(204,204,204,.2)] cursor-pointer hover:opacity-80 " /> :
        <AiOutlineHeart className="text-[#fff] scale-90 ease-in-out duration-300 px-3 py-2 rounded-full text-[40px] hover:bg-[rgba(204,204,204,.2)] cursor-pointer hover:opacity-8" />}
    </>
  )
}

export const ActiveFavouritesTitle = ({ item }: props) => {
  const { listFavourites } = useAppSelector((state: RootState) => state.favourites);
  const active = listFavourites?.map((item) => item?._id).includes(item?._id)
  return (
    <>
      {active ? <p className="text-white">Xoá khỏi thư viện</p> :
        <p className="text-white">Thêm thư viện</p>}
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



