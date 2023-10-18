import React from "react";

type Props = {};

const RoomCommentListItem = (props: Props) => {
  return (
    <div className="zm-room-comment-list-item flex py-[6px] pr-[6px]">
      <div className="media-left mr-[10px]">
        <div className="avatar w-[40px] h-[40px]">
          <img
            className="rounded-full"
            src="./Image/8584d41b88cd6ab9551784035fd74fbe.jpg"
            alt=""
          />
        </div>
      </div>
      <div className="media-right flex flex-col text-[14px] text-[#fff] rounded-[12px] w-auto grow-0 px-[12px] py-[8px] backdrop-blur-3xl">
        <div className="username flex items-center font-bold">Lê Nhung</div>
        <div className="content font-normal">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
          commodi magnam doloremque blanditiis consequuntur, aspernatur eius
          incidunt omnis ullam ipsa officiis eveniet excepturi molestiae, sit
          laboriosam possimus est asperiores voluptatum.
        </div>
      </div>
    </div>
  );
};

export default RoomCommentListItem;
