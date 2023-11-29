import { useAppSelector } from "@/store/hooks";
import ItemSong from "../ItemSong";
import { RootState } from "@/store/store";
import { ifSong } from "@/pages/Admin/Interface/ValidateSong";
import { BsMusicNoteList } from "react-icons/bs"
import Skeletontable from "../Skeleton";

const ListSong = ({listSong}:any) => {
  const { listFavourites, loading } = useAppSelector((state: RootState) => state.favourites)
  const { token } = useAppSelector((state: RootState) => state.user);
console.log(listSong);


  return (
    <>

      {

        token ?
          loading ? <Skeletontable /> :
          listSong?.length !== 0 ? <table className="w-full text-sm text-left">
              <thead className="text-xs text-[#86828c] uppercase ">
                <tr className="border-b-[#2c2436] border-b-[1px] ">
                  <th scope="col" className="pl-[40px] py-[15px]">
                    BÀI HÁT
                  </th>
                  <th scope="col" className="py-[15px]">
                    ALBUM
                  </th>
                  <th className="w-56 text-right pr-10 py-[15px]">THỜI GIAN</th>
                </tr>
              </thead>
              {listSong?.map((item: ifSong) => {
                return <ItemSong item={item} />
              })}
            </table> : <h1 className="flex items-center justify-center"><span className="mx-4 text-3xl"><BsMusicNoteList /></span>Chưa có bài hát nào</h1>
          : <h1 className="flex items-center justify-center"><span className="mx-4 text-3xl"><BsMusicNoteList /></span>Chưa đăng nhập</h1>
      }


    </>

  );
};

export default ListSong;
