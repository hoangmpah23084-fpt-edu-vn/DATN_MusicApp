import React from 'react'

type Props = {}

const Advertisement = (props: Props) => {
  return (
    <div className="week-chart mt-7">
    <div className="column">
      <div className="list flex -mx-[15px] relative">
        <div className="relative px-[15px] mb-8">
          <div className="card">
            <div className="card-image overflow-hidden rounded-[5px]">
              <img src="./Image/song-vn-2x.jpg" alt="" />
            </div>
          </div>
        </div>
        <div className="relative px-[15px] mb-8">
          <div className="card">
            <div className="card-image overflow-hidden rounded-[5px]">
              <img src="./Image/web_song_kpop.jpg" alt="" />
            </div>
          </div>
        </div>
        <div className="relative px-[15px] mb-8">
          <div className="card">
            <div className="card-image overflow-hidden rounded-[5px]">
              <img src="./Image/web_song_usuk.jpg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Advertisement