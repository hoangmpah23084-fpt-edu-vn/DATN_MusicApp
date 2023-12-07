import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ifSong } from '../Admin/Interface/ValidateSong';
import axios from 'axios';
import * as cloudinary from 'cloudinary-core';

const cl = new cloudinary.Cloudinary({  // Note: Use 'new' to create an instance
    cloud_name: 'dsbiugddk',
    api_key: '397545573884224',
    api_secret: '2BPHK1CLP_Yc8mQMV4ylPyJFzkI',
  });

type Props = {}

const DSong = (props: Props) => {
    const [song, setSong] = useState<ifSong[] | []>([]);
    useEffect(() => {
        // const cl = cloudinary.Cloudinary.new();
        // const cl = cloudinary.Cloudinary.new();
        axios.get('http://localhost:8080/api/Song/?_limit=20&_page=1').then(({ data }) => setSong(data.data))
    }, []);
    console.log(song);
    


    return (
        <div className='container'>
            <div className="chanel-section-title mt-[100px] pl-[60px] py-10 flex justify-between mb-[20px]">
                <h3 className="font-semibold capitalize text-white text-[40px]">
                    BXH Nhạc mới
                </h3>
            </div>
            <section className='music_charts min-h-[300px] px-10 overflow-y-scroll'>
                {
                    song.length > 0 && song.map(item => {
                        const publicId = item.song_link.split('/').pop();
                        // console.log(publicId);
                        const resourceUrl = cl.url(publicId as string, {resource_type: 'audio'});
                        // const data = 
                        axios.get(resourceUrl).then(response => {
                            // Handle the response
                            console.log(response);
                          }).catch(error => {
                            // Handle the error
                            console.error(error);
                          });
                        // cl.api.resource(publicId, function (error : any, result : any) {
                        //     if (error) {
                        //       console.error(error);
                        //     } else {
                        //       // Lấy thời gian của bài nhạc từ kết quả
                        //       const duration = result.duration;
                      
                        //       // Lưu thời gian vào state
                        //     //   setDurationInSeconds(duration);
                        //     }
                        //   });
                        return <div className='content hover:bg-stone-700 rounded-md px-5 py-21 hover:cursor-default'>
                            <div className='item flex items-center space-x-5 border-b border-[#393243]'>
                                <div className='song group/play grid grid-cols-[35%50%5%] gap-x-5 py-2 w-full items-center hover:rounded-md'>
                                    <div className='image_song relative flex items-center space-x-3'>
                                        <audio src={`${item.song_link}`} preload={"metadata"} autoPlay={false}></audio>
                                        <Link to={''} className='relative group/play'>
                                            <span className=''>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#FFF" className="bi bi-play-fill absolute top-[30%] left-[35%] invisible group-hover/play:visible" viewBox="0 0 16 16">
                                                    <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
                                                </svg>
                                            </span>
                                            <img className='rounded-md w-[55px] h-[55px]' src={`${item.song_image[0]}`} alt="" />
                                        </Link>
                                        <div className="name_song min-w-[300px] space-y-1">
                                            <p className=' text-white  font-semibold'>
                                                {item.song_name}
                                            </p>
                                            <p className="text-gray-500 font-semibold text-xs pb-2">
                                                Minh Vương, Đan Trường
                                            </p>
                                        </div>
                                    </div>
                                    {/* End .name_song */}
                                    <div className='text-gray-500 font-semibold min-w-[300px] '>
                                        <p className='text-sm'>
                                            Rất lâu rồi mới khóc (Single)
                                        </p>
                                    </div>
                                    <div className='time_song '>
                                        <span className='text-right text-gray-500 font-semibold text-sm'>
                                            05:05
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    })
                }

            </section>
            {/* End .music_charts */}

        </div>
    )
}

export default DSong