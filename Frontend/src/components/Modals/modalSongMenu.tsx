import { BiLogoFacebookCircle } from "react-icons/bi";
import { SiZalo } from "react-icons/si";
import { SlEarphonesAlt } from "react-icons/sl";
import { FaBan } from "react-icons/fa";
import { HiDocumentAdd } from "react-icons/hi";
import { MdReplay } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { PiMicrophoneStageDuotone } from "react-icons/pi";
import {
  AiOutlineHeart,
  AiOutlinePlus,
  AiOutlineDownload,
  AiOutlinePlusCircle,
  AiOutlineShareAlt,
  AiOutlineRight,
} from "react-icons/ai";
import { BsMusicNoteList } from "react-icons/bs";
import { useEffect, useState } from "react";
import instanceAxios from "@/utils/axios";
import { toast } from "react-toastify";
import ModalCreatePlaylist from "./createPlaylist";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteSongToPlaylist,
  getPlaylist,
} from "@/store/Reducer/playlistReducer";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import useClickOutside from "@/hooks/clickOutSide";
import { addSongToNextSong, addSongtoSideBarSong, deleteSongInListSong } from "@/store/Reducer/Song";

const ModalSongMenu = ({ song, onShowModal }: any) => {
  const { id } = useParams<{ id?: string }>();
  const [playlist, setPlaylist] = useState<any>([]);
  const [isShowModalCreate, setIsShowModalCreate] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentSong } = useAppSelector(({ currentSong }) => currentSong);
  const { song : listSong } = useAppSelector(({ Song }) => Song);

  const fetchDataPlaylist = async () => {
    try {
      const { data } = await instanceAxios.get(`/playlist`);
      setPlaylist(data.data);
    } catch (error) {
      toast.error(error as any);
    }
  };

  const handleAddToPlaylist = async (id: string) => {
    try {
      const resp: any = await instanceAxios.put(`/playlist/create/song/${id}`, {
        id_song: song._id,
      });
      toast.success(resp.data.message);
      navigate(`/playlist/${resp.data.data._id}`);
    } catch (error) {
      toast.error(error as string);
    }
  };

  const handleDeleteToPlaylist = async () => {
    try {
      const resp: any = await instanceAxios.put(`/playlist/delete/song/${id}`, {
        id_song: song._id,
      });

      dispatch(
        deleteSongToPlaylist({
          id,
          params: {
            id_song: song._id,
          },
        })
      );
      dispatch(getPlaylist(id as string));
      toast.success(resp.data.message);
      navigate(`/playlist/${resp.data.data._id}`);
    } catch (error) {
      toast.error(error as string);
    }
  };


  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      fetchDataPlaylist();
    }
  }, []);

  const handleShowModalCreatePlaylist = () => {
    setIsShowModalCreate(!isShowModalCreate);
  };

  const ref = useClickOutside(() => onShowModal());

  const handAddPlayList = () => {
    dispatch(addSongtoSideBarSong(song));
    onShowModal(false)
  }

  const handNextSongSidebar = () => {
    const findSong = listSong.findIndex( item => item._id == currentSong?._id);
    dispatch(addSongToNextSong({
      song,
      findSong
    }));
    onShowModal(false)
  }
  const handDeleteSongInList = () => {
    dispatch(deleteSongInListSong(song));
    onShowModal(false)
  }

  return (
    <>

      <div ref={ref} className="absolute z-[9999] bg-[#161b32] rounded-xl w-72 right-8">
        {isShowModalCreate && (
          <ModalCreatePlaylist onShowModal={handleShowModalCreatePlaylist} />
        )}
        <header className="flex items-center py-3 ml-2 pr-10 ">
          <img
            src={song.song_image[0]}
            alt=""
            className="w-10 h-10 rounded-lg mx-1 relative z-10"
          />
          <div className="mx-1">
            <p className="group relative ease-in-out duration-300">
              <h3 className="hover:text-[#3BC8E7]">{song.id_Singer.name}</h3>
              <div className="absolute z-40 -top-20 -left-48 pl-10 py-5 text-sm w-60 bg-[#34224f] scale-50 rounded-xl group-hover:-top-5 group-hover:scale-100 opacity-0 group-hover:-left-72 group-hover:scale-y-95 group-hover:opacity-100 ease-in-out duration-300">
                <div>
                  <p className="text-[#857a95]">Nghệ sĩ</p>
                  <p>{song.id_Singer.name}</p>
                </div>
                <div>
                  <p className="text-[#857a95]">Album</p>
                  <p>Đạt G</p>
                </div>
                <div>
                  <p className="text-[#857a95]">Sáng tác</p>
                  <p>{song.id_Singer.name}</p>
                </div>
                <div>
                  <p className="text-[#857a95]">Thể loại</p>
                  <p>{song.id_Genre.name}</p>
                </div>
              </div>
            </p>
            <div className="flex items-center">
              <p className="flex items-center mx-1 text-xs">
                <AiOutlineHeart />
                <span className="mx-1">{song.total_like}</span>
              </p>
              <p className="flex items-center mx-1 text-xs">
                <SlEarphonesAlt />
                <span className="mx-1">{song.view_song}</span>
              </p>
            </div>
          </div>
        </header>
        <div className="flex items-center justify-between bg-[#493961]  rounded-2xl mx-5">
          <span className="hover:bg-[#594b6f] px-4 py-2 hover:rounded-tl-2xl hover:rounded-bl-2xl ease-in-out duration-300">
            <AiOutlineDownload className="mx-3" />
            <p className="text-[10px]">Tải xuống</p>
          </span>
          <span className="text-center hover:bg-[#594b6f] px-3 py-2 ease-in-out duration-300">
            <PiMicrophoneStageDuotone className="mx-5" />
            <p className="text-[10px]">Lời bài hát</p>
          </span>
          <span className="text-center hover:bg-[#594b6f] px-3 py-2 hover:rounded-tr-2xl hover:rounded-br-2xl ease-in-out duration-300">
            <FaBan className="mx-5" />
            <p className="text-[10px]">chặn</p>
          </span>
        </div>
        <div className="mt-3">
          <ul className="text-base text-[#c4c2c8]">
            <li className="py-1 hover:bg-[#594b6f] ease-in-out duration-300">
              <button className="flex items-center" onClick={handAddPlayList}>
                <span className="mx-5">
                  <HiDocumentAdd />
                </span>
                Thêm vào danh sách phát
              </button>
            </li>
            <li className="py-1 hover:bg-[#594b6f] ease-in-out duration-300">
              <button className="flex items-center" onClick={handNextSongSidebar}>
                <span className="mx-5">
                  <MdReplay />
                </span>
                Phát tiếp theo
              </button>
            </li>
            <li className="py-1 hover:bg-[#594b6f] group relative ease-in-out duration-300">
              <button className="flex items-center">
                <span className="mx-5">
                  <AiOutlinePlusCircle />
                </span>
                Thêm vào playlist{" "}
                <span className="absolute right-8">
                  <AiOutlineRight />
                </span>
              </button>
              <div className="absolute overflow-y-auto z-40 -top-32 h-72 -left-40 py-5 text-sm w-60 bg-[#34224f] scale-50 rounded-lg group-hover:-top-52 group-hover:scale-100 opacity-0 group-hover:-left-60 group-hover:scale-y-95 group-hover:opacity-100 ease-in-out duration-300">
                <header className="mx-5">
                  <input
                    type="text"
                    placeholder="Tìm playlist"
                    className="bg-[#493961] border-none w-full py-1 text-sm rounded-xl outline-none text-white placeholder:text-white"
                  />
                </header>
                <div className="px-5 py-2 mt-4 hover:bg-[#594b6f] ">
                  <button
                    onClick={() => handleShowModalCreatePlaylist()}
                    className="flex items-center text-white"
                  >
                    <span className="bg-[#ca8dc6] px-2 py-1 text-white rounded-lg">
                      <AiOutlinePlus />
                    </span>
                    <p className="ml-2">Tạo Playlist mới</p>
                  </button>
                </div>
                <div className="">
                  <ul className=" text-white">
                    {playlist?.map((item: any) => (
                      <li
                        key={item._id}
                        onClick={() => handleAddToPlaylist(item._id)}
                        className="flex px-5 py-2 my-1 items-center hover:bg-[#594b6f]"
                      >
                        <span>
                          <BsMusicNoteList />
                        </span>
                        <p className="ml-3">{item.playlist_name}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
            {
              listSong.filter(item => item._id == song._id).length > 0 ? <li className="py-1 hover:bg-[#594b6f] ease-in-out duration-300" onClick={handDeleteSongInList}>
              <button className="flex items-center">
                <span className="mx-5">
                  <FaTrash />
                </span>
                Xóa bài hát
              </button>
            </li> : ''
            }
            {/* <li className="py-1 hover:bg-[#594b6f] group relative ease-in-out duration-300">
              <button className="flex items-center">
                <span className="mx-5">
                  <AiOutlineShareAlt />
                </span>
                Chia sẻ{" "}
                <span className="absolute right-8">
                  <AiOutlineRight />
                </span>
              </button>
              <div className="absolute z-40 h-36 -left-36 -top-16 py-2  text-sm w-56 bg-[#34224f] scale-50 rounded-lg group-hover:scale-100 opacity-0 group-hover:-left-56 group-hover:scale-y-95 group-hover:opacity-100 ease-in-out duration-300">
                <div className="">
                  <div className="flex items-center px-5 py-2 my-1 hover:bg-[#594b6f]">
                    <span className="text-blue-500">
                      <BiLogoFacebookCircle />
                    </span>
                    <p className="ml-3">FaceBook</p>
                  </div>
                  <div className="flex items-center px-5 py-2 my-1 hover:bg-[#594b6f]">
                    <span className="text-blue-500">
                      <SiZalo />
                    </span>
                    <p className="ml-3">Zalo</p>
                  </div>
                  <div className="flex items-center px-5 py-2 my-1 hover:bg-[#594b6f]">
                    <span></span>
                    <p className="ml-7">Mã nhúng</p>
                  </div>
                </div>
              </div>
            </li> */}
            {window.location.pathname.includes("/playlist/") && (
              <li
                onClick={() => handleDeleteToPlaylist()}
                className="py-1 hover:bg-[#594b6f] ease-in-out duration-300"
              >
                <button className="flex items-center">
                  <span className="mx-5">
                    <FaTrash />
                  </span>
                  Xóa bài hát khỏi Playlist
                </button>
              </li>
            )}
          </ul>
        </div>
        <footer className="py-2 text-center text-[#867b95]">
          <p>Cung cấp bởi LOOPS Music</p>
        </footer>
      </div>
    </>
  );
};

export default ModalSongMenu;
