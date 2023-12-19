import { RootState } from '@/store/store'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { veryPassShema } from '../Admin/Interface/User'
import { yupResolver } from '@hookform/resolvers/yup'
import { VeryPass, sendPass } from '@/store/Reducer/User'
import { useAppDispatch } from '@/store/hooks'
import { toast } from 'react-toastify'
import { AiOutlineLoading } from 'react-icons/ai'

type Props = {}

const ForgotPass = (props: Props) => {

    const [checkVery, setCheckVery] = useState(false)
    const [passNew, setPassNew] = useState("")
    const [seconds, setSeconds] = useState(30);
    const { loadingPass } = useSelector((state: RootState) => state.user)
    const dispatch = useAppDispatch()

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
                    {seconds === 0 && !passNew ? <button className=" ml-4 mr-14 text-white bg-[#3BC8E7] hover:bg-white hover:text-[#3BC8E7] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                        Gửi lại mã
                    </button> : checkVery && !passNew ? <h4>{seconds}s</h4> : ""}
                </div>
                {passNew && <p className="text-red-500 text-2xl">Mật khẩu mới : {passNew}</p>}
                <div className='flex items-center justify-end mt-10 pb-10'>
                    <a href='/signin' className="w-[20%] cursor-pointer text-white bg-[#b2b3b3] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                        Quay lại
                    </a>
                    {passNew ? <a href='/signin' className="w-[30%] ml-4 mr-14 text-white bg-[#3BC8E7] hover:bg-white hover:text-[#3BC8E7] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                        Đăng nhập ngay
                    </a> : <button className="w-[30%] ml-4 mr-14 text-white bg-[#3BC8E7] hover:bg-white hover:text-[#3BC8E7] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                        {checkVery && loadingPass ? <AiOutlineLoading className='animate-spin h-8 ease-in-out duration-300' /> : 'Lấy mã'}
                    </button>}
                </div>
            </form></>
    }
    return (
        <div className="bg-[#1b2039] absolute w-full h-full text-white z-50">
            <div className="fixed flex justify-center mt-20 z-50 w-full p-4 overflow-x-hidden overflow-y-auto  md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="relative min-w-[600px] max-w-md max-h-full">
                    <div
                        className="relative bg-[#231b2e] rounded-lg  shadow"
                    >
                        {forgotPassword()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPass