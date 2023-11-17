import useClickOutside from '@/hooks/clickOutSide';
import { SigninForm, SigninSchema } from '@/pages/Admin/Interface/validateAuth';
import { checkToken, signin } from '@/store/Reducer/User';
import { useAppDispatch } from '@/store/hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { AiOutlineClose } from "react-icons/ai";
import { toast } from 'react-toastify';


const ModalSignin = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SigninForm>({
        resolver: yupResolver(SigninSchema),
    });

    const dispatch = useAppDispatch();
    const onSubmit = async (dataSignin: SigninForm) => {
        const res: any = await dispatch(signin(dataSignin))
        toast.success(res.payload?.message)
        const { accessToken, user } = res?.payload
        if (accessToken && user) {
            const userUpgrade = JSON.stringify(user);
            localStorage.setItem("token", accessToken)
            localStorage.setItem("user", userUpgrade)

            dispatch(checkToken(false))
        }
    }

    const onShow = () => {
        dispatch(checkToken(false))
    }


    const ref = useClickOutside(() => onShow());



    return (
        <div className="bg-slate-950/80 absolute w-full h-full text-white z-50">
            <div className="fixed flex justify-center items-center z-50 w-full p-4 overflow-x-hidden overflow-y-auto  md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="relative w-full max-w-md max-h-full">
                    <div
                        ref={ref}
                        className="relative bg-[#231b2e] rounded-lg shadow dark:bg-gray-700 "
                    >
                        <button
                            onClick={() => onShow()}
                            type="button"
                            className="absolute top-3 right-2.5 text-gray-400 bg-transparent rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                            <span>
                                <AiOutlineClose />
                            </span>
                        </button>
                        <div className="px-6 py-6 lg:px-8">
                            <h3 className="mb-4 text-xl font-medium text-white dark:text-white">
                                Đăng nhập
                            </h3>
                            <form
                                className="space-y-6"
                                onSubmit={handleSubmit(onSubmit)}
                            >
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-white">
                                        Email
                                    </label>
                                    <input
                                        type="text"
                                        {...register("email")}
                                        placeholder="Nhập Email"
                                        className="bg-[#3a3244] text-white text-sm rounded-lg block w-full p-2.5"
                                    />
                                    {errors.email && (
                                        <p className="text-red-500">{errors.email.message}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-white">
                                        Mật khẩu
                                    </label>
                                    <input
                                        type="password"
                                        defaultValue={""}
                                        {...register("password")}
                                        placeholder="••••••••"
                                        className="bg-[#3a3244] text-white text-sm rounded-lg block w-full p-2.5"
                                    />
                                    {errors.password && (
                                        <p className="text-red-500">{errors.password.message}</p>
                                    )}
                                </div>

                                <button className="w-full text-white bg-[#654789] hover:bg-white hover:text-[#654789] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                                    Đăng nhập
                                </button>

                                <p className='text-center text-white'>Bạn chưa có tài khoản <a href="/signup" className='text-[#654789]'>Tạo tìa khoản</a></p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalSignin