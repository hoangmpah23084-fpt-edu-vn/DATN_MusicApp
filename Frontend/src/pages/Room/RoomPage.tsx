import React, { useEffect } from "react";
import "./css.scss";
import { Link, useParams } from "react-router-dom";
import { FiRadio } from "react-icons/fi";
import { AiOutlineEye, AiOutlineHeart } from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";
import RoomLeftItem from "@/components/Room-left-item";
import RoomCommentListItem from "@/components/Room-comment-list-item";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { leaveRoom } from "@/store/Reducer/roomReducer";
import { useAppDispatch } from "@/store/hooks";

type Props = {
  roomLive?: boolean;
};

const img_slide = [
  { id: 0, img: "../../../public/Image/efb05fb9097a7057aecef6ecb62bff5a.jpg" },
  { id: 1, img: "../../../public/Image/fd79808d2180de9a421afa6aff38953e.jpg" },
  { id: 2, img: "../../../public/Image/bf223818f85e7fe129091b415038ca6c.jpg" },
  { id: 3, img: "../../../public/Image/0ef8beec056970cb6e9596e056fa1c5a.jpg" },
  { id: 4, img: "../../../public/Image/9787e738668f7eec23d2e8e4306baac4.jpg" },
  { id: 5, img: "../../../public/Image/9787e738668f7eec23d2e8e4306baac4.jpg" },
  { id: 6, img: "../../../public/Image/9787e738668f7eec23d2e8e4306baac4.jpg" },
  { id: 7, img: "../../../public/Image/9787e738668f7eec23d2e8e4306baac4.jpg" },
  { id: 8, img: "../../../public/Image/e663da1f89026b0e73a979ca67a5eb96.jpg" },
  { id: 9, img: "../../../public/Image/ef629460aba3bf16ced1931b951a9dc6.jpg" },
  { id: 10, img: "../../../public/Image/ef629460aba3bf16ced1931b951a9dc6.jpg" },
  { id: 11, img: "../../../public/Image/9787e738668f7eec23d2e8e4306baac4.jpg" },
];

//background image
const background = "../../../public/Image/e1887a2c79f9d3d04984905cbf443a29.jpg";

const RoomPage = (props: Props) => {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  window.addEventListener('beforeunload', () => {
    console.log('User clicked back button');
  });
  useEffect(() => {
    return () => {
      if (confirm("Are you sure want to remove room ?")) {
        leaveRoom(id as string);
      }
    }
  },[])

  return (
    <div>
      <div
        className={`zm-room-wrapper bg-[#170f23] flex fixed 
        h-full
         left-0 top-0 right-0 bottom-0 text-white overflow-hidden`}
      >
        <div className="zm-left-content w-[88px] relative z-20 bg-[#21181c] h-full">
          <div className="scroll-container h-full">
            <div className="content relative h-full">
              <Swiper
                modules={[Navigation]}
                direction="vertical"
                slidesPerView={9}
                navigation={true}
              >
                {img_slide.map((slide) => {
                  return (
                    <SwiperSlide key={slide.id}>
                      <RoomLeftItem image={slide.img} />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </div>
        </div>

        <div
          style={{ backgroundImage: `url(${background})` }}
          className="zm-room relative bg-no-repeat bg-cover "
        >
          <div className="zm-room-opacity absolute top-0 left-0 right-0 bottom-0"></div>
          <div className="zm-room-content relative h-full p-[30px] pl-[40px] ">
            <div className="top-info flex">
              <div className="live-info flex">
                <div className="media-left relative mr-[10px]">
                  <div className="w-[80px] h-[80px] overflow-hidden">
                    <img
                      className="rounded-full"
                      src="../../../public/Image/fd79808d2180de9a421afa6aff38953e.jpg"
                      alt=""
                    />
                  </div>
                  <div className="label absolute bg-[#ff0a0a] uppercase flex justify-center items-center font-bold text-[12px] px-[15px] py-[1px] rounded-[5px] left-[50%] -translate-x-[50%] -bottom-[6px]">
                    Live
                  </div>
                </div>
                <div className="media-content flex flex-col ">
                  <div className="top">
                    <h3 className="title text-[48px] font-bold leading-[1.2]">
                      K-POP Radio
                    </h3>
                  </div>
                  <div className="bottom flex items-center gap-4">
                    <FiRadio />
                    <h3 className="text-[14px]">K-POP theo yêu cầu</h3>
                  </div>
                </div>
              </div>
              <div className="stats flex ml-[32px] gap-[20px] text-[18px]">
                <div className="view flex justify-center items-center gap-[10px]">
                  <AiOutlineEye />
                  <span>35</span>
                </div>
                <div className="like flex justify-center items-center gap-[10px]">
                  <AiOutlineHeart />
                  <span>23.349.437</span>
                </div>
              </div>
            </div>

            <div className="box-media-play w-[250px] mt-[40px]">
              <div className="title uppercase text-[12px] font-bold tracking-[1px]">
                Bài hát đang phát
              </div>
              <Link to={"#"}>
                <div className="media flex mt-[8px] p-[12px] rounded-[5px] items-center bg-[rgb(166,158,145)]">
                  <div className="media-left mr-[10px] grow-0 shrink-0">
                    <div className="w-[40px] h-[40px]">
                      <img
                        className="rounded-[5px]"
                        src="../../../public/Image/f8456a22c05f9b96e0e832ae0b643bf0.jpg"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="media-content grow shrink">
                    <div className="name text-[14px]">
                      <span>Kill this love</span>
                    </div>
                    <h3 className="subtitle text-[rgba(254,255,255,.6)]  text-[12px] uppercase">
                      Blackpink
                    </h3>
                  </div>
                  <div className="media-right grow-0 shrink-0 flex items-center">
                    <button className="cursor-pointer">
                      <AiOutlineHeart />
                    </button>
                  </div>
                </div>
              </Link>
            </div>

            <div className="action-group absolute right-[30px] top-[30px] z-30">
              <div className="item ">
                <button className="group relative ">
                  <BsChevronDown className="bg-[rgba(255,255,255,.2)] px-3 py-2 rounded-full text-[40px] hover:brightness-90 cursor-pointer" />
                  <div className="item-hover relative text-xs rounded-[5px] bg-[#000] text-center py-1 opacity-0 group-hover:opacity-100 ease-in-out duration-500 mt-[10px]">
                    <p className="text-white">Đóng</p>
                  </div>
                </button>
              </div>
            </div>
          </div>

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
                      src="../../../public/Image/8584d41b88cd6ab9551784035fd74fbe.jpg"
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
        </div>
      </div>
    </div>
  );
};

export default RoomPage;
