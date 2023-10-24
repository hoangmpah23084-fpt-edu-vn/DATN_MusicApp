import { IRoom } from '@/pages/Admin/Interface/Room';
import { BiHomeHeart } from 'react-icons/bi'
import { CiUnlock, CiLock } from "react-icons/ci"
type roomProps = {
    data: IRoom
    onHandlePassword: (roomData: IRoom) => void;
}

const ItemRoom = ({ data, onHandlePassword }: roomProps) => {
    const onHandleChild = () => {
        onHandlePassword(data)
    }
    return (
        <div className=' relative border-[#6f4d98] border-[1px] w-auto rounded-xl bg-[#2f2739]' >
            <div className='flex items-center relative mx-2 justify-between'>
                <div className='flex items-center'>
                    <span className='relative text-[50px] mx-2'>
                        <BiHomeHeart />
                    </span>
                    <div className='my-2 ml-1 mr-7'>
                        <h2 className='text-xl font-bold'>{data.name}</h2>
                        <p className='text-xs'>Số lượng {data.quanlity} / 2</p>
                    </div>
                </div>
                <div className='flex items-center '>
                    {data.quanlity === 1 ? <button className='relative bg-[#654789] min-w-[100px] py-2 rounded-full hover:bg-white hover:text-[#654789] flex items-center text-xs text-center justify-center ease-in-out duration-300' onClick={() => onHandleChild()}>Tham gia <span className='text-base ml-1'> {data.password ? <CiLock /> : <CiUnlock />}</span></button> :
                        <h3 className='relative bg-[#ff0a0a7a] px-3 min-w-[100px] py-2 rounded-full hover:bg-white hover:text-[#654789] flex items-center text-xs text-center justify-center ease-in-out duration-300'>Đã đầy <span className='text-base ml-1'> {data.password ? <CiLock /> : <CiUnlock />}</span></h3>}
                </div>
            </div>
        </div>
    )
}

export default ItemRoom