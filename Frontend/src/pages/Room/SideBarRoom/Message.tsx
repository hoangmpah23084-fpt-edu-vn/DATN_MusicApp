import RoomCommentListItem from '@/components/Room-comment-list-item'
import { DetailRoom, listMessages } from '@/pages/Admin/Interface/Room'
import instanceAxios from '@/utils/axios'
import React from 'react'
import { useParams } from 'react-router-dom'
import { Socket } from 'socket.io-client'

type Props = {
    listMess : listMessages[],
    socket : Socket,
    setListMess : React.Dispatch<React.SetStateAction<listMessages[]>>,
}

const Message = ({listMess, socket, setListMess}: Props) => {
  const {id} = useParams(); 
    const handSendMessage = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key == "Enter") {
      event.preventDefault()
      const user = localStorage.getItem("token");
      if (user) {
        const convert = JSON.parse(user);
        let formData = {
          id_room : id,
          id_sender : convert._id,
          textMessage : (event.target as HTMLInputElement).value
        }
        instanceAxios.post("http://localhost:8080/api/message", formData).then(({data}) => setListMess([...listMess, data.data]));
        socket.emit("newMessage", formData);
      }
      (event.target as HTMLInputElement).value = "";
      }
    }
  return (
    <div className="content-wrapper flex-1">
    <div className="zm-room-comment flex flex-col h-full justify-between">
      <div className="zm-room-comment-list flex flex-col py-[6px] h-[calc(100vh-265px)] overflow-y-auto">
        {
          listMess.length > 0 ? listMess.map((item, index) => <RoomCommentListItem item={item} key={index} />) : ''
        }
      </div>
      <form className="comment-input mt-[16px] flex items-center" >
        <div className="avatar w-[40px] h-[40px]">
          <img
            className="rounded-full"
            src="https://res.cloudinary.com/dsbiugddk/image/upload/v1699500124/DATN/lqlyeilscdksm54zgzsj.jpg"
            alt=""
          />
        </div>
        <div className="control ml-[10px] flex-1">
          <input
            className="text-[#fff] rounded-[100px] w-full items-center h-[2.5em] justify-start leading-[1.5] focus:outline-none"
            type="text"
            placeholder="Nhập bình luận vào đây..."
            onKeyDown={handSendMessage}
          />
        </div>
      </form>
    </div>
  </div>
  )
}

export default Message