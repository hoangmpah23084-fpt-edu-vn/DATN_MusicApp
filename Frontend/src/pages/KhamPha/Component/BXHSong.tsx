import BarChart from '@/components/Barchart'
import ListSongItem from '@/components/List-songs-item'
import React from 'react'
import { BsFillPlayCircleFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'

type Props = {}

const BXHSong = (props: Props) => {
  return (
    <>
    <div className="chanel-section mt-12 ">
    <div className="chanel-section-title flex justify-between mb-[20px]">
      <h3 className="text-xl font-semibold capitalize text-[#3BC8E7]">
        BXH Nhạc mới
      </h3>
    </div>
    <div className="column">
      <div className="list grid grid-cols-3 -mx-[15px]">
        <ListSongItem section="chanel" />
        <ListSongItem section="chanel" />
        <ListSongItem section="chanel" />
      </div>
    </div>
  </div>

  <div className="chart-home relative mt-12 rounded-[8px] overflow-hidden p-[20px]">
    <div className="bg-blur"></div>
    <div className="bg-alpha"></div>
    <div className="header flex relative mb-[20px]">
      <Link
        to={"#"}
        className="text-[28px] font-bold leading-normal normal-case bg-clip-text"
      >
        #zingchart
      </Link>
      <button>
        <BsFillPlayCircleFill className="w-[44px] text-[25px]" />
      </button>
    </div>
    <div className="column -mx-[15px] flex">
      <div className="list w-[41.6%]">
        <ListSongItem section="zingchart" />
        <ListSongItem section="zingchart" />
        <ListSongItem section="zingchart" />
      </div>
      <div className="zm-chart relative z-10 w-[58.3%]">
        <div className="chart-container">
          <BarChart />
        </div>
      </div>
    </div>
  </div>
    </>
  )
}

export default BXHSong