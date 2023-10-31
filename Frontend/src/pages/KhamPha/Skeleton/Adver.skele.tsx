import { ifSong } from '@/pages/Admin/Interface/ValidateSong'
import React from 'react'

type SkeleSong ={
    song : ifSong[]
}

const Adverskeleton = ({song} :SkeleSong) => {
  return (
    <div className='w-full h-[400px] grid grid-cols-5 gap-4 '>
        {
            song.map(item =>  
            <div className='w-full h-full animate-pulse'>
                <div className='w-full h-[75%] bg-[#20182D]'></div>
                <div className='w-full h-[25%]'>
                    <div className='w-full h-[10%] rounded-full bg-[#20182D] mt-3'></div>
                    <div className='w-1/3 h-[10%] rounded-full bg-[#20182D] mt-3'></div>
                </div>
            </div>)
        }
    </div>
  )
}

export default Adverskeleton