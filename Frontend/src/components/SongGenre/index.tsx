import { BsThreeDots } from "react-icons/bs";
import { Link } from "react-router-dom";
import 'react-loading-skeleton/dist/skeleton.css'
import "./index.scss";
import { ifSong } from "@/pages/Admin/Interface/ValidateSong";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { activeSong } from "@/constane/song.const";
import { useStyles } from "../Footer";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { ActiveFavourites, ActiveFavouritesTitle, onhandleFavourite } from "@/constane/favourites.const";
type Props = {
  item: ifSong
};

const SongGenre = ({ item }: Props) => {
  const { stateSong, dataLocal } = useAppSelector(({ currentSong }) => currentSong);
  const dispatch = useAppDispatch()
  const classes = useStyles();
  const token = localStorage.getItem('token')


  return (
    <div className="carousel-item flex flex-col h-full">
      <div className="card">
        <div className="card-top relative">
          <div className="card-image overflow-hidden rounded-[6px] relative">
            <Link to={`/genre/${item.id_Genre}`} className="z-10 cursor-pointer">
              <img
                className="rounded-[6px] aspect-square h-[252px] "
                src={`${item.song_image[0]}`}
              />
            </Link>
          </div>
          {/* <div className="overlay absolute w-full h-full top-0 bg-[rgba(0,0,0,.4)] hidden"></div> */}
          <div className="action-container absolute w-full h-[40px] top-[50%] -translate-y-[50%] hidden">
            <div className="flex gap-[10px] h-full justify-center items-center">
              <div className="rounded-full">
                <button className="text-[#3BC8E7] mx-2 group relative " onClick={() => onhandleFavourite(dispatch, item?._id as string, token as string)}>
                  <ActiveFavourites item={item} />
                  <div className="absolute -top-5 -left-11 text-xs w-32 bg-gray-600 text-center rounded-3xl py-1 opacity-0 group-hover:-top-8 group-hover:scale-y-95 group-hover:opacity-100 ease-in-out duration-300">
                    <ActiveFavouritesTitle item={item} />
                  </div>
                </button>
              </div>
              <div>
                <button className="border rounded-full" onClick={() =>
                  stateSong && dataLocal?._id == item._id
                    ? activeSong(dispatch, item, 'stopPause')
                    : activeSong(dispatch, item, "start")
                }>
                  {/* <AiOutlinePause className="text-[40px] p-1 pl-[6px]" /> */}
                  {dataLocal &&
                    stateSong &&
                    dataLocal?._id == item._id ? (
                    <PauseIcon className={classes.root} />
                  ) : (
                    <PlayArrowIcon className={classes.root} />
                  )}
                </button>
              </div>
              <div className="rounded-full">
                <button className="group relative flex justify-center items-center rounded-full px-[5px] ">
                  <BsThreeDots className="px-2 py-2 rounded-full text-[40px] hover:bg-[rgba(204,204,204,.2)] cursor-pointer hover:opacity-80 " />
                  <div className="absolute -top-5 right-[ưpx] text-xs px-[10px] py-[5px] bg-[#1e1e1e] text-center opacity-0 rounded-[5px] group-hover:opacity-100 group-hover:-top-[35px] ease-in-out duration-300">
                    <p className="text-white">Khác</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="card-content mt-[12px]">
          <h4>
            <Link to={`#`}>
              <span className="text-[14px] font-semibold">
                {item?.song_name}
              </span>
            </Link>
          </h4>
        </div>
      </div>
    </div>
  );
};

export default SongGenre;
