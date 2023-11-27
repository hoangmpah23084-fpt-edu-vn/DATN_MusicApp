import  { useEffect, useState } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { IoIosClose } from "react-icons/io";
import { MdPlayCircleOutline } from "react-icons/md";
import { CiCirclePlus } from "react-icons/ci";
import instanceAxios from "@/utils/axios";
import { toast } from "react-toastify";
import ModalCreatePlaylist from "@/components/Modals/createPlaylist";
import ModalDetelePlaylist from "@/components/Modals/DeletePlaylist";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getPlaylists } from "@/store/Reducer/playlistReducer";

const Playlist = () => {

    const [playlist, setPlaylist] = useState<any>([])
    const [isShowModalCreate, setIsShowModalCreate] = useState<boolean>(false)
    const [isShowModalDelete, setIsShowModalDelete] = useState<boolean>(false)
    const [playlistSelected, setPlaylistSelected] = useState<any>({})


    const getPlaylist = useAppSelector(( {playlist} ) => playlist);
    const dispatch = useAppDispatch();



    const fetchData = async () => {
        try {
            const { data } = await instanceAxios.get(`/playlist`)
            setPlaylist(data.data)
        } catch (error) {
            toast.error(error as any)
        }
    }

    useEffect(() => {
        dispatch(getPlaylists())      
        fetchData()
    }, [])

    const handleShowModal = () => {
        setIsShowModalCreate(!isShowModalCreate)
    }
    const handleShowModalDelele = (item?:any) => {
        setPlaylistSelected(item)
        setIsShowModalDelete(!isShowModalDelete)
    }

    return (
        <div>
            {isShowModalCreate && <ModalCreatePlaylist onShowModal={handleShowModal} />}
            {isShowModalDelete && <ModalDetelePlaylist playlist={playlistSelected} refreshData={fetchData} onShowModal={handleShowModalDelele} />}
            <div className="mt-[100px]">
                <div className="px-16 grid grid-cols-4 gap-12 mt-5">
                    <div onClick={() => handleShowModal()} className="cursor-pointer  min-h-[300px] flex items-center justify-center  border-[1px] border-solid border-[hsla(0,0%,100%,0.1)] rounded">
                        <div className="hover:text-[#9b4de0] ">
                            <span className="flex items-center justify-center">
                                <CiCirclePlus className="text-white hover:text-[#9b4de0] text-[32px] text-center" />
                            </span>
                            <span className="pt-[8px] text-[14px] hover:text-[#9b4de0] text-white ">
                                Tạo playlist mới
                            </span>
                        </div>
                    </div>

                    {
                        playlist?.map((item: any) => (
                            <div key={item?._id} className="cursor-pointer room-item--wrapper ">
                                <div className="rounded-[5px]  overflow-hidden room-item--img relative">
                                    <img
                                        src="../../../public/Image/225101dd3c5da17b87872c320a8f6e07.jpg"
                                        alt=""
                                    />
                                    <span className="absolute top-[50%] flex items-center justify-between left-[50%] translate-x-[-50%] translate-y-[-50%] opacity-0 py-[2px] min-w-[220px]">
                                        <IoIosClose onClick={() => handleShowModalDelele(item)} className="text-white text-[32px] w-[40px] h-[40px] hover:rounded-[999px] hover:bg-[hsla(0,0%,100%,0.5)]" />
                                    <Link to={`/playlist/${item._id}`}><MdPlayCircleOutline className="text-white text-[32px]" /></Link>   
                                        <HiOutlineDotsHorizontal className="text-white text-[32px] w-[40px] h-[40px] hover:rounded-[999px] hover:bg-[hsla(0,0%,100%,0.5)]" />
                                    </span>
                                </div>
                                <div>
                                    <span className="pt-[8px] text-[14px] text-white hover:text-[#9b4de0]">
                                        {item.playlist_name}
                                    </span>
                                    <span className="text-[hsla(0,0%,100%,0.5)]">{item.id_user.fullName}</span>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default Playlist;
