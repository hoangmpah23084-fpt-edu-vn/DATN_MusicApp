import { CreatePlaylistSchame } from "@/pages/Admin/Interface/Room";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { AiOutlineClose } from "react-icons/ai";
import useClickOutside from "@/hooks/clickOutSide";
import { useAppDispatch } from "@/store/hooks";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import instanceAxios from "@/utils/axios";

interface IProps {
  onShowModal: () => void;
}

const ModalCreatePlaylist = ({ onShowModal }: IProps) => {

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(CreatePlaylistSchame),
  });

  const navigate = useNavigate()

  const dispatch = useAppDispatch();

  const onHandleSubmit: any = async (data: {
    name: string;

  }) => {
    try {
      const resp: any = await instanceAxios.post('/playlist', data)
      toast.success(resp.data.message);
      navigate(`/playlist/${resp.data.data._id}`)
    } catch (error) {
      toast.error(error as string)
    } finally {
      reset();
      onShowModal();
    }
  };

  const ref = useClickOutside(() => onShowModal());

  return (
    <>
      <div className=" absolute w-full h-full text-white z-[99999]">
        <div className="fixed flex justify-center items-center z-[9999] w-full p-4 overflow-x-hidden overflow-y-auto  md:inset-0  max-h-full">
          <div className="relative w-[320px] max-w-md max-h-full">
            <div
              ref={ref}
              className="relative  bg-[#34224f] rounded-lg shadow dark:bg-gray-700 "
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
                <h3 className="text-center mb-4 text-xl font-medium text-white dark:text-white">
                  Tạo playlist mới
                </h3>
                <form
                  className="space-y-6 "
                  onSubmit={handleSubmit(onHandleSubmit)}
                >
                  <div>
                    <input
                      type="text"
                      {...register("playlist_name")}
                      placeholder="Nhập tên playlist mới"
                      className="bg-[#1B2039] mb-[32px] text-white text-sm rounded-[999px] block w-full p-2.5"
                    />

                  </div>

                  <button disabled={errors.playlist_name ? true : false} className={`${errors.playlist_name ? "opacity-[0.7]" : ""} w-full text-white bg-[#3BC8E7]  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center `}>
                    Tạo mới
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalCreatePlaylist;
