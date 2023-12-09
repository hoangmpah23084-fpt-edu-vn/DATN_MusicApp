import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Link, useParams } from "react-router-dom";
import { AiOutlineHeart, AiOutlinePause } from "react-icons/ai";
import { BsThreeDots, BsFillPlayFill } from "react-icons/bs";
import { handChangeStateSong } from "@/store/Reducer/currentSong";
import ListSong from "@/components/Favourites/ListSong";
import { useEffect } from "react";
import { handleGetOne } from "@/store/Reducer/singerReducer";
import { RootState } from "@/store/store";


const DetailSinger = () => {
    const currentSong = useAppSelector(({ currentSong }) => currentSong);
    const dispatch = useAppDispatch()
    const { dataOne } = useAppSelector((state: RootState) => state.singer)
    const handToggSong = () => {
        const state = currentSong.stateSong;
        dispatch(handChangeStateSong(!state));
    };

    const param = useParams()
    const id = param.id

    useEffect(() => {
        if (id) {
            dispatch(handleGetOne(id));
        }
    }, [id]);
    useEffect(() => {
        const handlePopState = () => {
          // Custom logic for handling the back arrow event
          console.log('Back arrow pressed');
          // Add your custom logic here
        };
    
        // Add event listener for the popstate event
        window.addEventListener('popstate', handlePopState);
    
        // Cleanup function to remove the event listener when the component unmounts
        return () => {
          window.removeEventListener('popstate', handlePopState);
        };
      }, []); 


    return (
        <div className="zm-section">
            <main className="px-[59px] text-white">
                <div className="playlist-content mt-[70px]">
                    <div className="container pt-[20px]">
                        <div className="pt-[20px]">
                            <div className="playlist-header block w-[300px] float-left sticky top-[110px]">
                                <div className="media-left relative">
                                    <div className="card-image overflow-hidden rounded-[6px] relative">
                                        <Link
                                            to={`#`}
                                            className="overflow-hidden w-[300px] h-[300px]"
                                        >
                                            <div className="rounded-[5px] overflow-hidden max-w-[350px] max-h-[350px] room-item--img relative">
                                                <img
                                                    src={dataOne?.images[0]}
                                                    alt=""
                                                />
                                            </div>
                                        </Link>
                                    </div>

                                    <div className="overlay absolute w-full h-full top-0 bg-[rgba(0,0,0,.4)] hidden">

                                    </div>

                                    <div className="action-container absolute w-full h-[40px] top-[50%] -translate-y-[50%] hidden">
                                        <div className="flex gap-[10px] h-full justify-center items-center">
                                            <div className="rounded-full w96 h-96" >

                                            </div>

                                            <div>
                                                <button className="border rounded-full">
                                                    {currentSong ? (
                                                        <AiOutlinePause className="text-[40px] p-1 pl-[6px]" />
                                                    ) : (
                                                        <BsFillPlayFill className="text-[40px] p-1 pl-[6px]" />
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="media-content text-center mt-[12px]">
                                    <div className="content-top">
                                        <h3 className="title text-[20px] font-semibold">

                                        </h3>
                                        <div className="release text-[12px] leading-7 text-[rgba(255,255,255,.5)]">
                                            Ca sĩ:{dataOne?.name}

                                        </div>
                                        <div className="release text-[12px] leading-7 text-[rgba(255,255,255,.5)]">
                                            Tuổi:{dataOne?.age}

                                        </div>
                                        <div className="release text-[12px] leading-7 text-[rgba(255,255,255,.5)]">
                                            Thông tin thêm:{dataOne?.description}
                                        </div>
                                    </div>
                                    <div className="actions flex flex-col items-center justify-center">
                                        <button
                                            className="flex bg-[#9b4de0] items-center rounded-[25px] my-[20px] px-[20px] py-[5px]"
                                            onClick={handToggSong}
                                        >
                                            {currentSong.stateSong ? (
                                                <AiOutlinePause className="text-[25px] font-black pr-1" />
                                            ) : (
                                                <BsFillPlayFill className="text-[25px] pr-1" />
                                            )}
                                            <span className="uppercase text-[14px] font-normal">
                                                {currentSong.stateSong ? "Dừng Phát" : "Tiếp tục phát"}{" "}
                                            </span>
                                        </button>
                                        <div className="flex">
                                            <button className="group relative flex justify-center items-center rounded-full px-[5px] ">
                                                <AiOutlineHeart className="px-3 py-2 rounded-full text-[40px] bg-[rgba(204,204,204,.2)] cursor-pointer hover:opacity-80 " />
                                                <div className="absolute -top-5 right-[ưpx] text-xs px-[10px] py-[5px] bg-[#1e1e1e] text-center opacity-0 rounded-[5px] w-32 group-hover:opacity-100 group-hover:-top-[35px] ease-in-out duration-300">
                                                    <p className="text-white">Thêm vào thư viện</p>
                                                </div>
                                            </button>

                                            {/* <div className="rounded-full"> */}
                                            <button className="group relative flex justify-center items-center rounded-full px-[5px] ">
                                                <BsThreeDots className="px-2 py-2 rounded-full text-[40px] bg-[rgba(204,204,204,.2)] cursor-pointer hover:opacity-80 " />
                                                <div className="absolute -top-5 right-[ưpx] text-xs px-[10px] py-[5px] bg-[#1e1e1e] text-center opacity-0 rounded-[5px] group-hover:opacity-100 group-hover:-top-[35px] ease-in-out duration-300">
                                                    <p className="text-white">Khác</p>
                                                </div>
                                            </button>
                                            {/* </div> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="playlist-content ml-[330px]">
                                <ListSong listSong={dataOne?.songs} />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default DetailSinger