import React from 'react'
import RoomCommentListItem from '../Room-comment-list-item'

type Props = {}

const RoomComment = (props: Props) => {
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
    <div className="content-wrapper flex-1">
      <div className="zm-room-comment flex flex-col h-full justify-between">
        <div className="zm-room-comment-list flex flex-col py-[6px] h-[calc(100vh-265px)] overflow-y-auto">
          <RoomCommentListItem />
          <RoomCommentListItem />
          <RoomCommentListItem />
          <RoomCommentListItem />
          <RoomCommentListItem />
          <RoomCommentListItem />
          <RoomCommentListItem />
          <RoomCommentListItem />
          <RoomCommentListItem />
        </div>
        <form className="comment-input mt-[16px] flex items-center">
          <div className="avatar w-[40px] h-[40px]">
            <img
              className="rounded-full"
              src="./Image/8584d41b88cd6ab9551784035fd74fbe.jpg"
              alt=""
            />
          </div>
          <div className="control ml-[10px] flex-1">
            <input
              className="text-[#fff] rounded-[100px] w-full items-center h-[2.5em] justify-start leading-[1.5] focus:outline-none"
              type="text"
              placeholder="Nhập bình luận vào đây..."
            />
          </div>
        </form>
      </div>
    </div>
  </div>
  )
}

export default RoomComment