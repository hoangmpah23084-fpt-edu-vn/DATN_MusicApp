

import { handImage } from '@/Mui/Component/handUpload';
import useClickOutside from '@/hooks/clickOutSide';
import { ifUserUpdate, userSchema } from '@/pages/Admin/Interface/User';
import { GetUser, updateUser } from '@/store/Reducer/User';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { RootState } from '@/store/store';
import { UserOutlined } from "@ant-design/icons";
import { yupResolver } from '@hookform/resolvers/yup';
import { Avatar } from "antd";
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineLoading } from "react-icons/ai"
import { toast } from 'react-toastify';
interface IProps {
    onShowModal: () => void;
}

const DetailUser = ({ onShowModal }: IProps) => {
    const {
        register,
        handleSubmit,
        reset,
    } = useForm({
        resolver: yupResolver(userSchema),
    });
    const dispatch = useAppDispatch()
    const ref = useClickOutside(() => onShowModal());
    const user = localStorage.getItem('user');
    const { dataUserOne } = useAppSelector((state: RootState) => state.user)
    const [loadingUpload, setLoadingUpload] = useState(false)
    const [img, setImg] = useState<string>("")
    if (user) {
        const data = JSON.parse(user)
        useEffect(() => {
            dispatch(GetUser(data._id))
        }, [])
    }

    const uploadIMG = async (e: any) => {
        setLoadingUpload(true)
        const file = e.target.files[0];
        if (file) {
            const fileCloud = await handImage([file])
            if (fileCloud) {
                setImg(fileCloud[0])
            }
            setLoadingUpload(false)
        }

    }

    const onHandleSubmit = (data: ifUserUpdate) => {
        const newData = {
            image: img,
            fullName: data.fullName
        }
        if (img) {
            dispatch(updateUser(newData)).unwrap().then(async (res) => {
                await toast.success(res.message);
                onShowModal()
                setImg('')
                if (user) {
                    const data = JSON.parse(user)
                    dispatch(GetUser(data._id))
                }
            })
        } else {
            dispatch(updateUser({ fullName: data.fullName })).unwrap().then(async (res) => {
                await toast.success(res.message);
                onShowModal()
                setImg('')
                if (user) {
                    const data = JSON.parse(user)
                    dispatch(GetUser(data._id))
                }
            })
        }
    }

    const onHandleCancel = () => {
        if (img) {
            setImg('')
        }
        reset()
        onShowModal()
    }

    return (
        <div className="bg-slate-950/80 absolute w-full h-full text-white z-50">
            <div className="fixed flex justify-center items-center z-50 w-full p-4 overflow-x-hidden overflow-y-auto  md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="relative min-w-[600px] max-w-md max-h-full">
                    <div
                        ref={ref}
                        className="relative bg-[#231b2e] rounded-lg  shadow"
                    >
                        <div className='ml-10 font-bold pt-4 mb-4'>
                            <p>Chỉnh sửa cá nhân</p>
                        </div>
                        <form onSubmit={handleSubmit(onHandleSubmit)}>
                            <div className='flex items-center'>
                                <div className='ml-16'>
                                    <div>
                                        {img || dataUserOne?.image ? <img className='rounded-full w-36 h-24 object-cover' src={img ? img : dataUserOne?.image} alt="" /> : <Avatar size={92} icon={<UserOutlined />} />}
                                    </div>
                                    <div className="flex items-center justify-center w-full mt-2">
                                        <label className="flex flex-col items-center justify-center w-full rounded-lg cursor-pointer bg-[#3bc8e7] ">
                                            {loadingUpload ? <AiOutlineLoading className='animate-spin h-8 ease-in-out duration-300' /> : <p>Sửa</p>}
                                            <input id="dropzone-file" type="file" className="hidden" onChange={(e: any) => uploadIMG(e)} />
                                        </label>
                                    </div>
                                </div>
                                <div className=' ml-12 relative w-full'>
                                    <div className=''>
                                        <label className="block mb-2 text-sm font-medium text-white">
                                            Email
                                        </label>
                                        <input
                                            type="text"
                                            defaultValue={dataUserOne?.email}
                                            className="bg-[#3a3244] text-white text-sm rounded-lg block w-[90%] p-2.5 opacity-50"
                                            disabled
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-white">
                                            Tên
                                        </label>
                                        <input
                                            type="text"
                                            {...register("fullName")}
                                            defaultValue={dataUserOne?.fullName}
                                            className="bg-[#3a3244] text-white text-sm rounded-lg block w-[90%] p-2.5"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className='flex items-center justify-end mt-10 pb-10'>
                                <span onClick={() => onHandleCancel()} className="w-[20%] cursor-pointer text-white bg-[#b2b3b3] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                                    Hủy
                                </span>
                                <button className="w-[20%] ml-4 mr-10 text-white bg-[#3BC8E7] hover:bg-white hover:text-[#3BC8E7] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                                    Lưu
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailUser