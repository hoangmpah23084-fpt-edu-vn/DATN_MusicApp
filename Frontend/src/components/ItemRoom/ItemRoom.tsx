import { IRoom } from '@/pages/Admin/Interface/Room';
import './ItemRoom.scss'
import { FaRegHandPointer } from 'react-icons/fa';
import { MdJoinInner } from 'react-icons/md';
type roomProps = {
    data: IRoom
    handleSelectedRoom: (data: IRoom) => void;
    handleShowModalJoinRoom: () => void
}

const ItemRoom = ({ data, handleSelectedRoom, handleShowModalJoinRoom }: roomProps) => {
    const onHandleChild = () => {
        handleShowModalJoinRoom()
        handleSelectedRoom(data)
    }
    return (
        <div className='cursor-pointer room-item--wrapper' onClick={() => onHandleChild()}>
            <div className='rounded-[5px] overflow-hidden room-item--img relative'>
                <img src="../../../public/Image/225101dd3c5da17b87872c320a8f6e07.jpg" alt="" />
                <span className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] opacity-0 py-[2px] rounded-[3px] border-[1px] border-[gray] text-center min-w-[120px]'>
                   Tham gia
                </span>
            </div>
            <div>
                <span className='pt-[6px] hover:text-[#9b4de0]'>
                    {data.nameGroup}
                </span>
            </div>
        </div>
    )
}

export default ItemRoom