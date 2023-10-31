import SongCarouselItem from '@/components/Song-carousel-item'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Adverskeleton from '../Skeleton/Adver.skele'
import { handGetSong } from '@/store/Reducer/Song'

type Props = {}

const HeardRecently = (props: Props) => {
    const song = useAppSelector(({Song}) => Song.song.filter((item , index) => index >= 7 && index <= 11 && item));
    const condition = useAppSelector(({Song}) => Song);
    const [showSkeleton, setShowSkeleton] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowSkeleton(false);
        }, 4000);

        return () => {
          console.log("HEHEEH");
            clearTimeout(timer);
        };
    }, []);

    
  return (
    <div className="carousel-wrapper relative ">
    <div className="carousel flex -mx-[15px]">
      <div className="carousel-container flex w-[100%]">
        {
            condition.loading ? (showSkeleton ? <Adverskeleton song={song} /> : song.map(item => <Link to={"/playlist"}>
            <SongCarouselItem item={item} />
          </Link>)) : <Adverskeleton song={song} />
        }  
      </div>
    </div>
  </div>
  )
}
export default HeardRecently