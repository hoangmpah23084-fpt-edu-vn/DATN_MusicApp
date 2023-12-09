import { CreateRoomSchame } from "@/pages/Admin/Interface/Room";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { AiOutlineClose } from "react-icons/ai";
import useClickOutside from "@/hooks/clickOutSide";
import { useAppDispatch } from "@/store/hooks";
import { addRoom, getRoom } from "@/store/Reducer/roomReducer";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface IProps {
  onShowModal: () => void;
}

const ModalCreateRoom = ({ onShowModal }: IProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(CreateRoomSchame),
  });

  const navigate = useNavigate()

  const dispatch = useAppDispatch();

  const onHandleSubmit: any = async (data: {
    nameGroup: string;
    password: string;
  }) => {
    try {
      const resp: any = await dispatch(addRoom(data))
      localStorage.removeItem('song');
      await dispatch(getRoom());
      toast.success(resp.payload.message);
      navigate(`/liveroom/${resp.payload.data._id}`)
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
      <div className="bg-slate-950/80 absolute w-full h-full text-white z-50">
        <div className="fixed flex justify-center items-center z-50 w-full p-4 overflow-x-hidden overflow-y-auto  md:inset-0 h-[calc(100%-1rem)] max-h-full">
          <div className="relative w-full max-w-md max-h-full">
            <div
              ref={ref}
              className="relative bg-[#231b2e] rounded-lg shadow dark:bg-gray-700 "
            >
              <button
                onClick={() => onShowModal()}
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <span>
                  <AiOutlineClose />
                </span>
              </button>
              <div className="px-6 py-6 lg:px-8">
                <h3 className="mb-4 text-xl font-medium text-white dark:text-white">
                  Tạo phòng
                </h3>
                <form
                  className="space-y-6"
                  onSubmit={handleSubmit(onHandleSubmit)}
                >
                  <div>
                    <label className="block mb-2 text-sm font-medium text-white">
                      Tên phòng
                    </label>
                    <input
                      type="text"
                      {...register("nameGroup")}
                      placeholder="Tên phòng"
                      className="bg-[#3a3244] text-white text-sm rounded-lg block w-full p-2.5"
                    />
                    {errors.nameGroup && (
                      <p className="text-red-500">{errors.nameGroup.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-white">
                      Mật khẩu
                    </label>
                    <input
                      type="password"
                      defaultValue={""}
                      {...register("password")}
                      placeholder="••••••••"
                      className="bg-[#3a3244] text-white text-sm rounded-lg block w-full p-2.5"
                    />
                    {errors.password && (
                      <p className="text-red-500">{errors.password.message}</p>
                    )}
                  </div>

                  <button className="w-full text-white bg-[#3BC8E7] hover:bg-white hover:text-[#3BC8E7] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                    Tạo phòng
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

export default ModalCreateRoom;
