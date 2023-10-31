import React from "react";
import { Link } from "react-router-dom";

type Props = {};

const ModalHeader = (props: Props) => {
  const user = localStorage.getItem("token");
  return (
    <div className="absolute top-[55px] bg-[#34224f] w-[350px] flex justify-center rounded-[8px] right-[5px]">
      {user ? (
        <button className="h-[44px] my-[10px] bg-[#9b4de0] w-[95%] rounded-[20px] font-bold flex items-center justify-center">
          Đăng xuất
        </button>
      ) : (
        <Link
          to={"/signin"}
          className="h-[44px] my-[10px] bg-[#9b4de0] w-[95%] rounded-[20px] font-bold flex items-center justify-center"
        >
          <button>Đăng nhập</button>
        </Link>
      )}
    </div>
  );
};

export default ModalHeader;
