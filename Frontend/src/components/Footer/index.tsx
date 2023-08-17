import React from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { Link } from "react-router-dom";

type Props = {};

const Footer = (props: Props) => {
  return (
    <div className="fixed z-10 w-[100%] bottom-0 bg-[#170f23]">
      <div className="level text-white h-[90px] px-[20px] bg-[#130c1c]  border-t-[1px] border-[#32323d] flex">
        <div className="flex items-center justify-start">
          <div className="flex items-center">
            <div className="flex">
              <div className="">
                <Link to={"#"}>
                  <div className="thumbnail-wrapper">
                    <div className="thumbnail w-[64px] h-[64px] mr-[10px]">
                      <img
                        src="https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/5/c/f/3/5cf36d55b9dce546b250d73db6239d5f.jpg"
                        alt=""
                        className="w-[100%] rounded-[5px]"
                      />
                    </div>
                  </div>
                </Link>
              </div>
              <div className="media-content flex justify-center items-start flex-col">
                <div className="is-mark level-left">
                  <div className="song-info-wrapper">
                    <span className="song-title-item">
                      <Link to={"#"}>
                        <div className="title-wrapper">
                          <span className="item-title title text-[14px] text-[#fff]">
                            Chỉ Vì Quá Hy Vọng
                          </span>
                        </div>
                      </Link>
                    </span>
                  </div>
                </div>
                <h3 className="is-one-line is-truncate subtitle ">
                  <Link to={"#"}>
                    <div className="title-wrapper">
                      <span className="item-title title text-[13px] font-thin text-[#dadada]">
                        Hoài Lâm
                      </span>
                    </div>
                  </Link>
                </h3>
              </div>
              <div className="flex items-center justify-center">
                <div className="flex items-center justify-center ml-[20px] ">
                  <div className="level-item">
                    <button className="bg">
                      <AiOutlineHeart />
                      <i className="icon ic-like-full"></i>
                    </button>
                  </div>
                  <div className="level-item">
                    <span id="np_menu">
                      <button className="zm-btn zm-tooltip-btn btn-more is-hover-circle button">
                        <BsThreeDots />
                      </button>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
