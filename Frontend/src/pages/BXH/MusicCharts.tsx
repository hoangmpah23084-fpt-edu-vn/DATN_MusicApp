import ListSongItem from '@/components/List-songs-item';
import React from 'react';
import { BsFillPlayCircleFill } from 'react-icons/bs';
import {Link} from 'react-router-dom';
import BarChart from '@/components/Barchart';

type Props = {}

const MusicCharts = (props: Props) => {
  return (
    <div className='container'>
      <div className="chanel-section-title mt-[100px] px-20 py-10 flex justify-between mb-[20px]">
        <h3 className="font-semibold capitalize text-white text-[40px]">
          BXH Nhạc mới
        </h3>
      </div>
      <section className='music_charts min-h-[300px] px-10'>
        <div className='content hover:bg-stone-700 hover:rounded-md px-10 py-2 hover:cursor-default'>
          <div className='item flex items-center space-x-5 '>
            <div className='text-white text-5xl font-bold'>
              <span className=''>1</span>
            </div>
            <div className=''>
              <span className='font-bold text-gray-400 text-4xl '>-</span>
            </div>
            <div className='song group/play grid grid-cols-[35%50%5%] gap-x-5 w-full items-center hover:bg-stone-700 hover:rounded-md'>
              <div className='image_song relative flex items-center space-x-3'>
                <Link to={''} className='relative group/play'>
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#FFF" className="bi bi-play-fill absolute top-[22%] left-[22%] invisible group-hover/play:visible" viewBox="0 0 16 16">
                      <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
                    </svg>
                  </span>
                  <img className='rounded-md w-[70px] h-[70px]  ' src="https://picsum.photos/200/200" alt="" />
                </Link>
                <div className="name_song min-w-[300px] space-y-1">
                  <p className=' text-white text-[22px] font-semibold'>
                    Rất lâu rồi mới khóc
                  </p>
                  <p className="text-gray-500 font-semibold">
                    Minh Vương, Đan Trường
                  </p>
                </div>
              </div>
              {/* End .name_song */}
              <div className='text-gray-500 font-semibold min-w-[300px] '>
                <p>
                  Rất lâu rồi mới khóc (Single)
                </p>
              </div>
              <div className='time_song '>
                <span className='text-right text-gray-500 font-semibold'>
                  05:05
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End .music_charts */}
    
    </div>
    // End .container
  )
}

export default MusicCharts