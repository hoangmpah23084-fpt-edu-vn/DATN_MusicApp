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
import { checkToken } from "@/store/Reducer/User";

import { Skeleton } from "antd";

const Room = () => {
  const [isShowModalCreateRoom, setIsShowModalCreateRoom] =
    useState<boolean>(false);

  const [isShowModalJoinRoom, setIsShowModalJoinRoom] =
    useState<boolean>(false);

  const [selectedRoom, setSelectedRoom] = useState<IRoom>({} as IRoom);

  const { room, loading } = useAppSelector((state: RootState) => state.room);
  const { token } = useAppSelector((state: RootState) => state.user);

  const dispatch = useAppDispatch();

  const fetchRoom = () => {
    try {
      dispatch(getRoom());
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchRoom();
  }, [dispatch]);

  const handleShowModalCreateRoom = () => {
    if (token) {
      setIsShowModalCreateRoom(!isShowModalCreateRoom);
    } else {
      dispatch(checkToken(true));
    }
  };

  const handleShowModalJoinRoom = () => {
    if (token) {
      setIsShowModalJoinRoom(!isShowModalJoinRoom);
    } else {
      dispatch(checkToken(true));
    }
  };

  const handleSelectedRoom = (data: IRoom) => {
    setSelectedRoom(data);
  };

  const handleSerach = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e) {
      dispatch(getRoom(e.target.value as string));
    }
  };

  const renderSkeletonImages = (count: number) => {
    const skeletons = [];
    for (let i = 0; i < count; i++) {
      const skeleton = (
        <Skeleton.Image
          key={i}
          active
          style={{
            width: "200px",
            height: "200px",
            backgroundColor: "#352849",
          }}
        />
      );

      skeletons.push(skeleton);
    }

    return skeletons;
  };

  return (
    <>
      {isShowModalJoinRoom && (
        <ModalRoom data={selectedRoom} onShowModal={handleShowModalJoinRoom} />
      )}
      {isShowModalCreateRoom && (
        <ModalCreateRoom onShowModal={handleShowModalCreateRoom} />
      )}
      <div className="text-white w-full h-[100%]">
        <div className="px-[15px] md:px-16 mt-[70px]">
          <div className="flex items-center flex-col gap-5 md:flex-row justify-between pt-[20px]">
            <h1 className="flex items-center text-[40px] font-bold justify-center gap-2">
              <span className=" hover:opacity-70 cursor-pointer ease-in-out duration-300">
                <AiOutlineHome />
              </span>
              Phòng Nhạc{" "}
            </h1>
            <input
              type="text"
              className="bg-[#1B2039] ouline-none text-white text-sm rounded-lg block w-full md:w-96 p-2.5 "
              placeholder="Tìm phòng"
              required
              onChange={(e) => {
                handleSerach(
                  e as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                );
              }}
            />
            <button
              className="relative bg-[#3BC8E7] min-w-[130px] py-2 rounded-full hover:bg-white hover:text-[#3BC8E7] flex items-center text-md text-center justify-center ease-in-out duration-300"
              onClick={() => handleShowModalCreateRoom()}
            >
              Tạo phòng{" "}
              <span className="text-xl font-bold ml-2">
                <FaPlus />{" "}
              </span>
            </button>
          </div>
          <div className="md:pb-[40%] grid grid-cols-2 md:grid-cols-6 gap-6 md:gap-4 mt-7 md:mt-5">
            {loading
              ? renderSkeletonImages(room.length)
              : room.map((data: IRoom, index: number) => {
                  return (
                    <ItemRoom
                      key={index}
                      data={data}
                      handleSelectedRoom={handleSelectedRoom}
                      handleShowModalJoinRoom={handleShowModalJoinRoom}
                    />
                  );
                })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Room;
