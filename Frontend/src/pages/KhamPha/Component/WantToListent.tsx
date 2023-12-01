import SongCarouselItem from '@/components/Song-carousel-item'
import React from 'react'

type Props = {}

const WantToListent = (props: Props) => {
  return (
    <div className="playlist-section home-recent mt-12">
    <div className="home-recent-title flex justify-between mb-[20px]">
      <h3 className="text-xl font-semibold capitalize text-[#3BC8E7]">
        Có thể bạn muốn nghe
      </h3>
    </div>
    <div className="carousel-wrapper relative ">
      <div className="carousel flex -mx-[15px] overflow-hidden">
        <div className="carousel-container flex w-[100%]">
          {/* <SongCarouselItem />
          <SongCarouselItem />
          <SongCarouselItem />
          <SongCarouselItem />
          <SongCarouselItem /> */}
        </div>
      </div>
    </div>
  </div>
  )
}

export default WantToListent