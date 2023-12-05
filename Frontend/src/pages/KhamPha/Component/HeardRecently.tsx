import SongCarouselItem from '@/components/Song-carousel-item'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Adverskeleton from '../Skeleton/Adver.skele'
import { handGetSong } from '@/store/Reducer/Song'
import { getAlbum } from '@/store/Reducer/albumReducer'

type Props = {};

const HeardRecently = (props: Props) => {
    const song = useAppSelector(({Song}) => {
      console.log(Song);
      return Song.song.filter((item , index) => index >= 7 && index <= 11 && item)
    });
    const condition = useAppSelector(({Song}) => Song);
    const [showSkeleton, setShowSkeleton] = useState(true);
    const {album} = useAppSelector(({album}) => album);
    const dispatch = useAppDispatch();

    useEffect(() => {
      dispatch(getAlbum());
        const timer = setTimeout(() => {
            setShowSkeleton(false);
        }, 4000);

        return () => {
            clearTimeout(timer);
        };
    }, []);
  return (
    <div className="carousel-wrapper relative ">
    <div className="carousel flex -mx-[15px]">
      <div className="carousel-container flex w-[100%]">
        {
          // /${item.
            condition.loading ? (showSkeleton ? <Adverskeleton song={song} /> : album.map((item) => <Link key={item._id} to={`playlist/${item._id}`}>
            <SongCarouselItem item={item} />
          </Link>)) : <Adverskeleton song={song} />
        }  
      </div>
    </div>
    </div>
  );
};
export default HeardRecently;
