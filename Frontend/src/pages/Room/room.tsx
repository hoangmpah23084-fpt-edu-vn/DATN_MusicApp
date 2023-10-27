import ItemRoom from "@/components/ItemRoom/ItemRoom";
import ModalRoom from "@/components/Modals/room";
import { useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";

import { IRoom } from "../Admin/Interface/Room";
import ModalCreateRoom from "@/components/Modals/createRoom";

interface ICreateRoom {
  name: string;
  password: string;
}

const Room = () => {
  const [isShowModalCreateRoom, setIsShowModalCreateRoom] =
    useState<boolean>(false);

  const [dataModal, setDataModal] = useState<IRoom>({
    id: 0,
    name: "",
    quanlity: 0,
  });

  const data = [
    {
      id: 1,
      name: "room 1",
      quanlity: 1,
    },
    {
      id: 2,
      name: "room 2 room",
      quanlity: 1,
      password: "abc",
    },
    {
      id: 3,
      name: "room 3 room",
      quanlity: 2,
    },
    {
      id: 4,
      name: "room 4",
      quanlity: 1,
    },
    {
      id: 5,
      name: "room 5",
      quanlity: 2,

      password: "abc",
    },
    {
      id: 6,
      name: "room 6",
      quanlity: 2,
      password: "abc",
    },
    {
      id: 7,
      name: "room 7",
      quanlity: 2,
    },
    {
      id: 8,
      name: "room 8",
      quanlity: 1,
      password: "abc",
    },
    {
      id: 9,
      name: "room 9",
      quanlity: 1,

      password: "abc",
    },
    {
      id: 10,
      name: "room 10",
      quanlity: 1,
      password: "abc",
    },
    {
      id: 11,
      name: "room 1",
      quanlity: 1,
    },
  ];

  const onTest = (data: IRoom) => {
    if (data.password || data.password === "") {
      setDataModal(data);
    }
  };

  const handleShowModalCreateRoom = () => {
    setIsShowModalCreateRoom(!isShowModalCreateRoom);
  };

  return (
    <>
      <ModalRoom dataModal={dataModal} onHandleResetData={onTest} />
      {isShowModalCreateRoom && (
        <ModalCreateRoom onShowModal={handleShowModalCreateRoom} />
      )}
      <div>
        <div className="text-white w-full h-[100%]">
          <div className="flex items-center justify-between mt-24 mx-16 ">
            <h1 className="flex items-center text-[40px] font-bold ">
              Phòng Nhạc{" "}
              <span className="ml-2 mt-1 hover:opacity-70 cursor-pointer ease-in-out duration-300">
                <AiOutlineHome />
              </span>
            </h1>
            <input
              type="text"
              className="bg-[#3a3244] ouline-none text-white text-sm rounded-lg block w-96 p-2.5"
              placeholder="Tìm phòng"
              required
            />
            <button
              className="relative bg-[#b76cea] min-w-[130px] py-2 rounded-full hover:bg-white hover:text-[#654789] flex items-center text-md text-center justify-center ease-in-out duration-300"
              onClick={() => handleShowModalCreateRoom()}
            >
              Tạo phòng{" "}
              <span className="text-xl font-bold ml-2">
                <FaPlus />{" "}
              </span>
            </button>
          </div>
          <div className="pb-[40%] px-16 grid grid-cols-2 gap-4 mt-5">
            {data.map((data: IRoom) => {
              return <ItemRoom data={data} onHandlePassword={onTest} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Room;
