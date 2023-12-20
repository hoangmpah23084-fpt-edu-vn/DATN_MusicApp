import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "@/store/hooks";
import { getOneAlbum } from "@/store/Reducer/albumReducer";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import ListSong from "@/components/Favourites/ListSong";

type Props = {};

const DetailAlbum = (props: Props) => {

  const { listOneAlbum } = useSelector((state: RootState) => state.album)

  const param = useParams();
  const id = param.id;
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getOneAlbum(id as string))
  }, [id]);

  return (
    <div className="chanel-section-title mt-[70px] md:mt-[100px] px-[15px] md:px-16 py-2 flex justify-between md:mb-[20px] text-[#fff]  flex-col">
      <span className="w-44 font-bold text-xl">Chi tiết Album</span>
      <ListSong listSong={listOneAlbum} activeAbum={true} />
    </div>

  );
};

export default DetailAlbum;
