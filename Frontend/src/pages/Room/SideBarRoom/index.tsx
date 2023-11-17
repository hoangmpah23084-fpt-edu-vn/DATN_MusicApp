import React from 'react'
import Message from './Message'
import { listMessages } from '@/pages/Admin/Interface/Room'
import { Socket } from 'socket.io-client'

type Props = {
  listMess : listMessages[],
  socket : Socket,
  setListMess : React.Dispatch<React.SetStateAction<listMessages[]>>,
}

const SideBarRoom = ({ listMess, socket, setListMess}: Props) => {
  return (
    <div className="zm-room-right-content absolute w-[340px] p-[20px] bg-[rgba(0,0,0,.5)] flex flex-col right-[30px] top-[94px] bottom-[30px] rounded-[12px] ">
    <div className="main-tabs text-[12px] mb-[12px]">
      <ul className="flex bg-[rgba(254,255,255,.1)] rounded-[15px] justify-center self-center p-[3px] max-w-max relative">
        <li className="tab-item font-medium px-[20px] py-[3px] rounded-[15px] bg-[rgba(254,255,255,.2)] cursor-pointer">
          Trò chuyện
        </li>
        <li className="tab-item font-medium px-[20px] py-[3px] cursor-pointer">
          Lịch phát
        </li>
        <li className="tab-item font-medium px-[20px] py-[3px] cursor-pointer">
          Yêu cầu
        </li>
      </ul>
    </div>
    {/* message */}
    <Message listMess={listMess} socket={socket} setListMess={setListMess} />
  </div>

  )
}

export default SideBarRoom;