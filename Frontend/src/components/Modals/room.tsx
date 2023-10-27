import { IRoom } from "@/pages/Admin/Interface/Room";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineClose } from "react-icons/ai";
import useClickOutside from "@/hooks/clickOutSide";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/store/hooks";
import { joinRoom } from "@/store/Reducer/roomReducer";



type roomProps = {
  onShowModal: () => void;
  data: IRoom;
};

const ModalRoom = ({ onShowModal, data }: roomProps) => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  
  const onHandleSubmit: SubmitHandler<any> = async ({password}) => {
    console.log(password);
    console.log(data);

    

    await dispatch(joinRoom({
      idChat: data._id,
      password: password
    })).then((data:any) => {
      console.log(data);
      
      // if(data) {
      //   alert(data)
      // }
    })
  
    // navigate("/liveroom");
    reset();
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
                type="button"
                onClick={() => onShowModal()}
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <span>
                  <AiOutlineClose />
                </span>
              </button>
              <div className="px-6 py-6 lg:px-8">
                <h3 className="mb-4 text-xl font-medium text-white dark:text-white">
                  Phòng {data.nameGroup}
                </h3>
                <form
                  className="space-y-6"
                  onSubmit={handleSubmit(onHandleSubmit)}
                >
                  <div>
                    <label className="block mb-2 text-sm font-medium text-white">
                      Mật khẩu
                    </label>
                    <input
                      type="password"
                      {...register("password")}
                      placeholder="••••••••"
                      className="bg-[#3a3244] text-white text-sm rounded-lg block w-full p-2.5"
                    />
                  </div>
                  <button className="w-full text-white bg-[#654789] hover:bg-white hover:text-[#654789] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                    Tham gia
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

export default ModalRoom;
