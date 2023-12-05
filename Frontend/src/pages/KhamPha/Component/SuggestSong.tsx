import ListSongItem from '@/components/List-songs-item'
import React, { useEffect, useState } from 'react'
import SuggSkeleton from '../Skeleton/Sugg.skeleton'

type Props = {}

const SuggestSong = (props: Props) => {
  const [loading, setLoading] = useState(true);
  const [data, dataLoading] = useState([1,2,3,4,5,6,7,8,9]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    },7000);
    return () => clearTimeout(timer)
  },[])

  return (
    <div className="suggested-list-songs mt-12">
    <div className="suggested-list-songs-title flex flex-col justify-between mb-[20px]">
      <h4 className="text-[rgb(140,136,146)] font-light flex">
        Bắt đầu nghe từ một bài hát
      </h4>
      <h3 className="text-xl font-semibold capitalize">
        Gợi ý từ nhạc bạn đã nghe
      </h3>
    </div>
    <div className="column">
      <div className="list grid grid-cols-3 -mx-[15px]">
        {
          loading ? (data.map((_, index) => <SuggSkeleton section="suggested" key={index} /> ))  : (data.map((_, index) => <SuggSkeleton section="suggested" key={index} /> )) 
        }
      </div>
    </div>
  </div>
  )
}

export default SuggestSong