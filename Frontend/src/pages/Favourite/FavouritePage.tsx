import { AiFillPlayCircle } from "react-icons/ai";
import { BsPlusLg } from "react-icons/bs";
import { Link } from "react-router-dom";
import ListSong from "@/components/Favourites/ListSong";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import { getFavourite } from "@/store/Reducer/favouriteReducer";
import { RootState } from "@/store/store";

const FavouritePage = () => {
  const token = localStorage.getItem("token");

  const { listFavourites } = useAppSelector(
    (state: RootState) => state.favourites
  );
  // console.log('listFavourites', listFavourites);

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (token) {
      dispatch(getFavourite());
    }
  }, [token]);

  return (
    <div className="text-white w-full h-[100%]">
      <div className="px-[15px] md:px-16 mt-[70px]">
        <h1 className="flex items-center text-[40px] font-bold pt-5">
          Thư viện{" "}
          <span className="ml-2 mt-1 hover:opacity-70 cursor-pointer ease-in-out duration-300">
            <AiFillPlayCircle />
          </span>
        </h1>
        {/* <h2 className="mt-10 font-bold text-2xl flex items-center">
          PLAYLIST
          <span className="text-3xl ml-2 relative group">
            <BsPlusLg className="px-1 py-1 rounded-full bg-[#2f2739] cursor-pointer hover:opacity-80 " />
            <div className="absolute -top-8 -left-10 text-xs w-28 bg-gray-600 text-center rounded-3xl py-1 opacity-0 group-hover:opacity-100 ease-in-out duration-300">
              <p>Tạo playlist mới</p>
            </div>
          </span>
        </h2> */}
        {/* <div className="mt-10 ">
          <ul className="flex items-center border-b-[1px] border-b-[#2c2436]">
            <li className="mr-5 pb-3 border-b-[#3BC8E7] border-b-2 hover:scale-95 ease-in-out duration-300">
              <Link to="#">BÀI HÁT</Link>
            </li>
            <li className="mx-5 pb-3 hover:scale-95 ease-in-out duration-300">
              <Link to="#">PODCAST</Link>
            </li>
            <li className="mx-5 pb-3 hover:scale-95 ease-in-out duration-300">
              <Link to="#">ALBUM</Link>
            </li>
            <li className="mx-5 pb-3 hover:scale-95 ease-in-out duration-300">
              <Link to="#">MV</Link>
            </li>
          </ul>
        </div> */}

        <div className="mt-5">
          <ul className="flex items-center text-center text-xs">
            <li>
              <Link
                to="#"
                className="px-3 py-1 mr-4 border-2 rounded-3xl bg-[#3BC8E7] border-[#3BC8E7]"
              >
                YÊU THÍCH
              </Link>
            </li>
            {/* <li>
              <Link
                to="#"
                className="px-3 py-1 border-2 rounded-3xl hover:text-[#3BC8E7] hover:border-[#3BC8E7]"
              >
                ĐÃ TẢI LÊN
              </Link>
            </li> */}
          </ul>
        </div>
        <div className="overflow-x-auto py-10">
          <ListSong listSong={listFavourites} />
        </div>
      </div>
    </div>
  );
};

export default FavouritePage;
