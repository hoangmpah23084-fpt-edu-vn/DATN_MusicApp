import { CreatePlaylistSchame } from "@/pages/Admin/Interface/Room";
import { yupResolver } from "@hookform/resolvers/yup";

import { AiOutlineClose } from "react-icons/ai";
import useClickOutside from "@/hooks/clickOutSide";
import { useAppDispatch } from "@/store/hooks";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import instanceAxios from "@/utils/axios";

interface IProps {
  onShowModal: () => void;
  playlist: any,
  refreshData:any
}

const ModalDetelePlaylist = ({ onShowModal , playlist , refreshData }: IProps) => {


  const navigate = useNavigate()

  const dispatch = useAppDispatch();

  const handleClick = async () => {
    try {
      const resp: any = await instanceAxios.delete(`/playlist/${playlist._id}`)
      toast.success(resp.data.message);
      refreshData()
    } catch (error) {
      toast.error(error as string)
    } finally {
      onShowModal();
    }
  };

  const ref = useClickOutside(() => onShowModal());

  return (
    <>
      <div className="bg-slate-950/80 absolute w-full h-full text-white z-50">
        <div className="fixed flex justify-center items-center z-[9999] w-full p-4 overflow-x-hidden overflow-y-auto  md:inset-0  max-h-full">
          <div className="relative w-[550px] ">
            <div
              ref={ref}
              className="relative bg-[#34224f]  pb-[24px] rounded-lg shadow dark:bg-gray-700 "
            >
              <button
                onClick={() => onShowModal()}
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent rounded-[50%] text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <span>
                  <AiOutlineClose />
                </span>
              </button>
              <div className="px-6 py-6 lg:px-8">
                <h3 className=" mb-4 text-xl font-medium text-white dark:text-white">
                  Xóa Playlist
                </h3>
                <p>
                  Playlist của bạn sẽ bị xóa khỏi thư viện cá nhân. Bạn có muốn xóa?
                </p>
              </div>
              <div className="flex items-center justify-end ml-[32px]">
                <button   onClick={() => onShowModal()} className="px-[8px] py-[3px] rounded-[999px] bg-[#ffffff1a] min-w-[80px] ">Không </button>
                <button onClick={() => handleClick()} className="px-[8px] py-[3px] rounded-[999px] bg-[#9b4de0] min-w-[80px] mx-[16px]">Có </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalDetelePlaylist;
