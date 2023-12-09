

import useClickOutside from '@/hooks/clickOutSide';
import { ifUserUpgrade, userUpdateSchema, veryPassShema } from '@/pages/Admin/Interface/User';
import { VeryPass, changePassUser, sendPass } from '@/store/Reducer/User';
import { useAppDispatch } from '@/store/hooks';
import { RootState } from '@/store/store';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { AiOutlineLoading } from 'react-icons/ai'

interface IProps {
    onShowModal: () => void;
}

const ChangePassword = ({ onShowModal }: IProps) => {
    const ref = useClickOutside(() => onShowModal());
    const [typeInput, setTypeInput] = useState('password')
    const dispatch = useAppDispatch()
    const { loadingPass } = useSelector((state: RootState) => state.user)
    const [checkPass, setCheckPass] = useState<boolean>(false)
    const [checkVery, setCheckVery] = useState(false)
    const [passNew, setPassNew] = useState("")


    const onTypeInput = (e: any) => {
        if (e.target.checked) {
            setTypeInput('text')
        } else {
            setTypeInput('password')
        }
    }



    const onCheckPass = () => {
        setCheckPass(!checkPass)
    }


    const changePass = () => {
        const {
            register,
            handleSubmit,
            formState: { errors },
            reset,
        } = useForm({
            resolver: yupResolver(userUpdateSchema),
        });

        const onHandleSubmit = (data: ifUserUpgrade) => {
            dispatch(changePassUser(data)).unwrap().then((res) => {
                toast.success(res.message)
                reset()
                onShowModal()
            })
        }

        const onhandleCancel = () => {
            reset()
            onShowModal()
        }




        return <>
            <div className='text-center font-bold pt-4 mb-4'>
                <p>Đổi mật khẩu</p>
            </div>
            <form className='ml-10' onSubmit={handleSubmit(onHandleSubmit)}>
                <div className=''>
                    <label className="block mb-2 text-sm font-medium text-white">
                        Mặt khẩu cũ
                    </label>
                    <input
                        type={typeInput}
                        placeholder='A-z-0'
                        {...register("password")}
                        className="bg-[#3a3244] text-white text-sm rounded-lg block w-[90%] p-2.5 opacity-50"
                    />
                    {errors.password && (
                        <p className="text-red-500">{errors.password.message}</p>
                    )}
                </div>
                <div className='mt-2'>
                    <label className="block mb-2 text-sm font-medium text-white">
                        Mật khẩu mới
                    </label>
                    <input
                        type={typeInput}
                        placeholder='A-z-0'
                        {...register("passwordUpgrade")}
                        className="bg-[#3a3244] text-white text-sm rounded-lg block w-[90%] p-2.5 opacity-50"
                    />
                    {errors.passwordUpgrade && (
                        <p className="text-red-500">{errors.passwordUpgrade.message}</p>
                    )}
                </div>
                <div className='mt-2'>
                    <label className="block mb-2 text-sm font-medium text-white">
                        Nhập lại mật khẩu mới
                    </label>
                    <input
                        type={typeInput}
                        placeholder='A-z-0'
                        {...register("confirmPasswordUpgrade")}
                        className="bg-[#3a3244] text-white text-sm rounded-lg block w-[90%] p-2.5 opacity-50"
                    />
                    {errors.confirmPasswordUpgrade && (
                        <p className="text-red-500">{errors.confirmPasswordUpgrade.message}</p>
                    )}
                </div>
                <div className='flex items-center mt-2 justify-between mr-14'>
                    <p className='ml-2 text-[#3f8aff] cursor-pointer' onClick={() => onCheckPass()}>Quên mật khẩu</p>
                    <div className='flex items-center'> <input type="checkbox" onChange={(e: any) => onTypeInput(e)} />
                        <p className='ml-2'>Hiện thị mật khẩu</p></div>
                </div>
                <div className='flex items-center justify-end mt-10 pb-10'>
                    <span onClick={() => onhandleCancel()} className="w-[20%] cursor-pointer text-white bg-[#b2b3b3] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                        Hủy
                    </span>
                    <button className="w-[20%] ml-4 mr-10 text-white bg-[#3BC8E7] hover:bg-white hover:text-[#3BC8E7] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                        {loadingPass ? <AiOutlineLoading className='animate-spin h-8 ease-in-out duration-300' /> : 'Lưu'}
                    </button>

                </div>
            </form>
        </>
    }

    const [seconds, setSeconds] = useState(30);

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds((prevSeconds) => (prevSeconds > 0 ? prevSeconds - 1 : 0));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const forgotPassword = () => {
        const {
            register,
            handleSubmit,
            formState: { errors },
            reset,
        } = useForm({
            resolver: yupResolver(veryPassShema),
        });


        const onHandleSubmit = (data: any) => {
            checkVery ? dispatch(sendPass(data)).unwrap().then((res: any) => {
                toast.success(res.message)
                setPassNew(res.data)

            }) : dispatch(VeryPass(data)).unwrap().then((res) => {
                toast.success(res.message)
                if (seconds !== 0) {
                    setCheckVery(true)
                    reset({ code: '' });
                }
                setSeconds(30)
            })
        }

        console.log(checkVery);

        const onhandleCancel = () => {
            reset()
            onShowModal()
        }

        return <> <div className='text-center font-bold pt-4 mb-4'>
            <p>Lấy lại mật khẩu</p>
        </div>
            <form className='ml-10' onSubmit={handleSubmit(onHandleSubmit)}>
                <div className=''>
                    <label className="block mb-2 text-sm font-medium text-white">
                        Nhập Email
                    </label>
                    <input
                        type='text'
                        placeholder='A-z-0'
                        {...register("email")}
                        className="bg-[#3a3244] text-white text-sm rounded-lg block w-[90%] p-2.5"
                    />
                    {errors.email && (
                        <p className="text-red-500">{errors.email.message}</p>
                    )}
                </div>
                <div className='mt-2'>
                    {checkVery ? <> <label className="block mb-2 text-sm font-medium text-white">
                        Mã xác thực
                    </label>
                        <input
                            type='text'
                            placeholder='A-z-0'
                            {...register("code")}
                            className="bg-[#3a3244] text-white text-sm rounded-lg block w-[90%] p-2.5"
                        />
                    </> : <div className='hidden'> <label className="block mb-2 text-sm font-medium text-white">
                        Mã xác thực
                    </label>
                        <input
                            type='text'
                            placeholder='A-z-0'
                            defaultValue={"00123"}
                            {...register("code")}
                            className="bg-[#3a3244] text-white text-sm rounded-lg block w-[90%] p-2.5"
                        />
                    </div>
                    }
                    {errors.code && (
                        <p className="">{errors.code.message}</p>
                    )}
                    {seconds === 0 ? <button className=" ml-4 mr-14 text-white bg-[#3BC8E7] hover:bg-white hover:text-[#3BC8E7] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                        Gửi lại mã
                    </button> : checkVery && !passNew ? <h4>{seconds}s</h4> : ""}
                </div>
                {passNew && <p className="text-red-500 text-2xl">Mật khẩu mới : {passNew}</p>}
                <div className='flex items-center justify-end mt-10 pb-10'>
                    <span onClick={() => onhandleCancel()} className="w-[20%] cursor-pointer text-white bg-[#b2b3b3] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                        Hủy
                    </span>
                    <button className="w-[25%] ml-4 mr-14 text-white bg-[#3BC8E7] hover:bg-white hover:text-[#3BC8E7] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                        {checkVery ? loadingPass ? <AiOutlineLoading className='animate-spin h-8 ease-in-out duration-300' /> : passNew ? <p onClick={() => setCheckPass(!checkPass)}>Đổi mật khẩu</p> : <p>Lưu</p> : loadingPass ? <AiOutlineLoading className='animate-spin h-8 ease-in-out duration-300' /> : 'Lấy mã'}
                    </button>

                </div>
            </form></>
    }


    return (
        <div className="bg-slate-950/80 absolute w-full h-full text-white z-50">
            <div className="fixed flex justify-center items-center z-50 w-full p-4 overflow-x-hidden overflow-y-auto  md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="relative min-w-[600px] max-w-md max-h-full">
                    <div
                        ref={ref}
                        className="relative bg-[#231b2e] rounded-lg  shadow"
                    >
                        {checkPass ? forgotPassword() : changePass()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChangePassword