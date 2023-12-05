import React from "react";

type Props = {
  placeholder?: string;
  prefix?: React.ReactNode;
  type?: string;
};

const Input = ({ placeholder, prefix, type }: Props) => {
  return (
    <div className={`flex items-center `}>
      {prefix && prefix}
      <input
      type="search"
        className={`p-0 outline-none px-2 block ${
          type === "search" &&
          "w-full bg-[#2f2739] h-[40px] text-[14px] rounded-3xl focus:outline-none border-none placeholder: pl-9 lg:mx-auto lg:w-[30rem]"
        }`}
        autoComplete="off"
        placeholder={placeholder && placeholder}
      />
    </div>
  );
};

export default Input;
