
import { AiFillHeart } from "react-icons/ai"
import { BsMusicNoteBeamed, BsThreeDots } from "react-icons/bs"
import { Link } from "react-router-dom"
import { TfiVideoClapper } from "react-icons/tfi"
import { PiMicrophoneStageDuotone } from "react-icons/pi"
import { FaPlay } from "react-icons/fa"
import "./index.css"
import { useState } from "react"
import ModalSongMenu from "../Modals/modalSongMenu"

const ItemSong = () => {

    const [modal, setModal] = useState<boolean>(false)

    return (
        <tbody>
            <tr className="item border-b-[#2c2436] border-b-[1px] cursor-pointer hover:bg-[#2f2739] ease-in-out duration-500">
                <td scope="row" className=" py-2 font-medium flex items-center">
                    <span className="px-3">
                        <input type="checkbox" className="item_list hidden w-[14px] h-[14px]" />
                        <BsMusicNoteBeamed className="item_list_time" />
                    </span>
                    <img src="https://i.ytimg.com/vi/z3qOnZIqRVs/maxresdefault.jpg" alt="" className="w-10 h-10 rounded-lg mx-1 relative z-10" />
                    <span className="absolute z-50 left-[100px] item_list px-4 py-4"><FaPlay /></span>
                    <div className="mx-1">
                        <p>Khó Vẽ Nụ cười</p>
                        <Link to={`#`} className="text-xs text-[#86828c] hover:text-[#9b4de0] hover:border-b-[#9b4de0] hover:border-b-[1px]">Đạt G</Link>
                    </div>
                </td>
                <td className="py-2">
                    <Link to={`#`} className="text-sm text-[#86828c] hover:text-[#9b4de0] hover:border-b-[#9b4de0] hover:border-b-[1px]">album Đạt G</Link>
                </td>
                <td>
                    <div className="flex items-center justify-center mr-2">
                        <span className="item_list mx-2 group relative">
                            <TfiVideoClapper className="px-3 py-2 rounded-full text-[40px] hover:bg-[#423a4b] cursor-pointer hover:opacity-80 " />
                            <div className="absolute -top-5 -left-9 text-xs w-28 bg-gray-600 text-center rounded-3xl py-1 opacity-0 group-hover:-top-8 group-hover:scale-y-95 group-hover:opacity-100 ease-in-out duration-300">
                                <p>Xem MV</p>
                            </div>
                        </span>
                        <span className="item_list mx-2 group relative"><PiMicrophoneStageDuotone className="px-3 py-2 rounded-full text-[40px] hover:bg-[#423a4b] cursor-pointer hover:opacity-80 " />
                            <div className="absolute -top-5 -left-11 text-xs w-32 bg-gray-600 text-center rounded-3xl py-1 opacity-0 group-hover:-top-8 group-hover:scale-y-95 group-hover:opacity-100 ease-in-out duration-300">
                                <p>Phát cùng lời bài hát</p>
                            </div>
                        </span>
                        <button className="text-[#9b4de0] mx-2 group relative "><AiFillHeart className="px-3 py-2 rounded-full text-[40px] hover:bg-[#423a4b] cursor-pointer hover:opacity-80 " />
                            <div className="absolute -top-5 -left-11 text-xs w-32 bg-gray-600 text-center rounded-3xl py-1 opacity-0 group-hover:-top-8 group-hover:scale-y-95 group-hover:opacity-100 ease-in-out duration-300">
                                <p className="text-white">Xóa yêu thích</p>
                            </div>
                        </button>


                        <button className="item_list mx-2 hidden" onClick={() => setModal(!modal)}><BsThreeDots className="px-3 py-2 rounded-full text-[40px] hover:bg-[#423a4b] cursor-pointer hover:opacity-80 " />
                        </button>
                        {modal && <>
                            <div className="z-40 absolute w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full" onClick={() => setModal(false)}></div >
                            <ModalSongMenu />
                        </>}

                        <span className="mx-2 text-sm text-[#86828c] item_list_time"><p className="px-3 py-2 rounded-full text-[9px] hover:bg-[#423a4b] cursor-pointer hover:opacity-80 " >4:00</p></span>
                    </div>
                </td>
            </tr>
        </tbody>
    )
}

export default ItemSong