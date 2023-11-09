import ItemRoom from "@/components/ItemRoom/ItemRoom";
import ModalRoom from "@/components/Modals/room";
import { useEffect, useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";

import { IRoom } from "../Admin/Interface/Room";
import ModalCreateRoom from "@/components/Modals/createRoom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getRoom } from "@/store/Reducer/roomReducer";
import { RootState } from "@/store/store";

const Room = () => {
  const [isShowModalCreateRoom, setIsShowModalCreateRoom] =
    useState<boolean>(false);

    const [isShowModalJoinRoom, setIsShowModalJoinRoom] =
    useState<boolean>(false);

    const [selectedRoom,setSelectedRoom] = useState<IRoom>({} as IRoom)

  const { room } = useAppSelector((state:RootState) => state.room);
  const dispatch = useAppDispatch();

  const fetchRoom =() => {
    try {
      dispatch(getRoom());
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchRoom()
  }, [dispatch]);

  const handleShowModalCreateRoom = () => {
    setIsShowModalCreateRoom(!isShowModalCreateRoom);
  };

  const handleShowModalJoinRoom = () => { 
    setIsShowModalJoinRoom(!isShowModalJoinRoom);
  };

  const handleSelectedRoom = (data:IRoom) => {
    setSelectedRoom(data)
  }

  return (
    <>
      {isShowModalJoinRoom && <ModalRoom data={selectedRoom} onShowModal={handleShowModalJoinRoom} />}
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
          <div className="pb-[40%] px-16 grid grid-cols-6 gap-6 mt-5">
            {room.map((data: IRoom , index:number) => {
              return <ItemRoom key={index} data={data} handleSelectedRoom={handleSelectedRoom} handleShowModalJoinRoom={handleShowModalJoinRoom} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Room;
