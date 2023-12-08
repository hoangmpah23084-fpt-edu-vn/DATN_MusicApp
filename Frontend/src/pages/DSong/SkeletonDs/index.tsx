import { useState } from 'react';

const SkeletonDs = () => {
    const [song] = useState([0,1,2,3,4,5,6,7,8,9])
    return (
        <>
            {
                song.length > 0 && song.map((item) => {
                    return <div className='content rounded-md px-5 py-21 hover:cursor-default animate-pulse' key={item} >
                        <div className='item flex items-center space-x-5 border-b border-[#393243]'>
                            <div className='song group/play grid grid-cols-[35%50%5%] gap-x-5 py-2 w-full items-center hover:rounded-md'>
                                <div className='image_song relative flex items-center space-x-3'>
                                    <div className='rounded-md bg-slate-200 w-[55px] h-[55px]'></div>
                                    <div className="name_song min-w-[300px] space-y-2">
                                        <div className='w-full h-2 bg-slate-200 rounded-md'></div>
                                        <div className='w-[70%] h-2 pb-2 bg-slate-200 rounded-md'></div>
                                    </div>
                                </div>
                                <div className='text-slate-200 font-semibold min-w-[300px] '>
                                    <div className='w-[40%] h-2 bg-slate-200 rounded-md'></div>
                                </div>
                                <div className='time_song '>
                                    <div className='w-[50%] bg-slate-200 h-2 rounded-md'></div>
                                </div>
                            </div>
                        </div>
                    </div>
                })
            }
        </>
    )
}

export default SkeletonDs