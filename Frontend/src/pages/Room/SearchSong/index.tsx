import React from 'react'
import { CiSearch } from "react-icons/ci";
import '../css.scss'

type Props = {}

const SearchSongInRoom = (props: Props) => {
  return (
    <div className='w-full flex flex-col'>
      <div className='w-full flex justify-center items-center'>
        <CiSearch className="bg-[#2F2739] h-full w-[40px] p-2 rounded-l-full" />
        <input type="text" className='w-full bg-[#2F2739] text-white rounded-r-full px-[3px] OutlineSearch font-inter' placeholder='Search...' />
      </div>
    </div>
  )
}

export default SearchSongInRoom