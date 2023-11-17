import { listMessages } from "@/pages/Admin/Interface/Room";
import React from "react";

type Props = {
  item : listMessages
};

const RoomCommentListItem = ({item}: Props) => {
  return (
    <div className="zm-room-comment-list-item flex py-[6px] pr-[6px]">
      <div className="media-left mr-[10px]">
        <div className="avatar w-[40px] h-[40px]">
          <img
            className="rounded-full"
            src="https://res.cloudinary.com/dsbiugddk/image/upload/v1699500124/DATN/lqlyeilscdksm54zgzsj.jpg"
            alt=""
          />
        </div>
      </div>
      <div className="media-right flex flex-col text-[14px] text-[#fff] rounded-[12px] w-auto grow-0 px-[12px] py-[8px] backdrop-blur-3xl">
        <div className="username flex items-center font-bold">{item.id_sender.fullName}</div>
        <div className="content font-normal">
         { item.textMessage }
        </div>
      </div>
    </div>
  );
};

export default RoomCommentListItem;
