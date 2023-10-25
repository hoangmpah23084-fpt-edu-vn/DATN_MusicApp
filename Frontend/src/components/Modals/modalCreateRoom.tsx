import React from "react";
import { AiOutlineClose } from "react-icons/ai";

type Props = {
  modalCreateRoom: boolean;
};

const ModalCreateRoom = (props: Props) => {
  const OnReset = () => {
    
  };
  return (
    <div
      className={`bg-slate-950/80 absolute w-full h-full text-white z-50 
    ${props.modalCreateRoom ? "block" : "hidden"}
    `}
    >
      <div className="fixed flex justify-center items-center z-50 w-full p-4 overflow-x-hidden overflow-y-auto  md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div className="relative w-full max-w-md max-h-full">
          <div className="relative bg-[#231b2e] rounded-lg shadow dark:bg-gray-700 ">
            <button
              type="button"
              onClick={() => OnReset()}
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
              <form className="space-y-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-white">
                    Tên phòng
                  </label>
                  <input
                    type="text"
                    className="bg-[#3a3244] text-white text-sm rounded-lg block w-full p-2.5"
                  />
                  <p className="text-red-500">Nhung</p>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-white">
                    Số lượng
                  </label>
                  <input
                    type="number"
                    className="bg-[#3a3244] text-white text-sm rounded-lg block w-full p-2.5"
                  />
                  <p className="text-red-500">Nhung</p>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-white">
                    Mật khẩu
                  </label>
                  <input
                    type="password"
                    className="bg-[#3a3244] text-white text-sm rounded-lg block w-full p-2.5"
                  />
                  <p className="text-red-500">Nhung</p>
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
  );
};

export default ModalCreateRoom;
