import { IRoom } from "@/pages/Admin/Interface/Room";
import "./ItemRoom.scss";
import instanceAxios from "@/utils/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
type roomProps = {
    data: IRoom;
    handleSelectedRoom: (data: IRoom) => void;
    handleShowModalJoinRoom: () => void;
};

const ItemRoom = ({
    data,
    handleSelectedRoom,
    handleShowModalJoinRoom,
}: roomProps) => {
    const navigate = useNavigate();

    const onHandleChild = async () => {
        if (data.password) {
            handleShowModalJoinRoom();
            handleSelectedRoom(data);
        } else {
            try {
                const resp = await instanceAxios.post("http://localhost:8080/api/joinroom", {
                    idChat: data._id,
                    password: ""
                })
                localStorage.removeItem('song');
                navigate(`/liveroom/${resp.data.data._id}`);
                toast.success(resp.data.message)
            } catch (error) {
                toast.error(error as string)
            }
        }
    };
    return (
        <div
            className="cursor-pointer room-item--wrapper"
            onClick={() => onHandleChild()}
        >
            <div className="rounded-[5px] overflow-hidden room-item--img relative">
                <img
                    src="../../../public/Image/225101dd3c5da17b87872c320a8f6e07.jpg"
                    alt=""
                />
                <span className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] opacity-0 py-[2px] rounded-[3px] border-[1px] border-[gray] text-center min-w-[120px]">
                    Tham gia
                </span>
            </div>
            <div>
                <span className="pt-[6px] hover:text-[#3BC8E7]">{data.nameGroup}</span>
            </div>
        </div>
    );
};

export default ItemRoom;
