import { listMessages } from "@/pages/Admin/Interface/Room";
import React, { useEffect, useState } from "react";
import './index.css'

type Props = {
  item : listMessages
};

const RoomCommentListItem = ({item}: Props) => {
  const [userLocal , setUserLocal] = useState<any | {}>({});
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      return;
    }
    const paserUser = JSON.parse(user);
    setUserLocal(paserUser);
  },[])
  return (
    <div className="zm-room-comment-list-item flex py-[6px] pr-[6px]">
      <div className="media-left mr-[10px]">
        <div className="avatar w-[40px] h-[40px]">
          <img
            className="rounded-full w-full h-full"
            src={`${userLocal && userLocal.image ? userLocal.image : 'https://res.cloudinary.com/dsbiugddk/image/upload/v1699500124/DATN/lqlyeilscdksm54zgzsj.jpg'} `}
            alt=""
          />
        </div>
      </div>
      <div className="media-right flex flex-col text-[14px] text-[#fff] wrap rounded-[12px] w-[230px] grow-0 px-[12px] py-[8px] backdrop-blur-3xl">
        <div className="username flex items-center font-bold">{item.id_sender.fullName}</div>
        <div className="content font-normal">
         { item.textMessage }
        </div>
      </div>
    </div>
  );
};

export default RoomCommentListItem;
