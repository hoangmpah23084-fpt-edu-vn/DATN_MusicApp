import ListSongItem from '@/components/List-songs-item'
import React, { useEffect, useState } from 'react'
import SuggSkeleton from '../Skeleton/Sugg.skeleton'
import axios from 'axios'
import { IGenre } from '@/pages/Admin/Interface/genre'

type Props = {}

const SuggestSong = (props: Props) => {
  const [loading, setLoading] = useState(true);
  const [data, dataLoading] = useState<IGenre>();
  const [gener, setGener] = useState<IGenre[] | []>([]);
  const [indexOf, setIndexOf] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    },5000);
    axios.get("http://localhost:8080/api/genre").then(({data}) => {
      setGener(data.data)
      dataLoading(data.data[0])
    })
    return () => clearTimeout(timer)
  },[])
  
  const handShowGenre = (item : IGenre, index : number) => {
    setIndexOf(index)
    dataLoading(item)
  }
  

  return (
    <div className="suggested-list-songs mt-12">
    <div className="suggested-list-songs-title flex flex-col justify-between mb-[20px]">
      <h4 className="text-[rgb(140,136,146)] font-light flex">
        Bắt đầu nghe từ một bài hát
      </h4>
      <h3 className="text-xl font-semibold capitalize">
       Top bài nhạc thịnh hành
      </h3>
    </div>
    <div className="column">
      <div className='flex justify-start items-center gap-4 px-[15px] py-[10px]'>
        {
          gener.length > 0 && gener.map((item, index) => <button className={`border-[1px] border-[#f5f7f82d] rounded-full text-[12px] px-5 py-1 ${indexOf == index ? 'bg-[#9B4DE0]' : ''}`} onClick={() => handShowGenre(item, index)}>{item.name}</button>)
        }
      </div>
      <div className="list grid grid-cols-3 -mx-[15px]">
        {
          loading ? (data?.list_songs.map((_, index) => <SuggSkeleton section="suggested" key={index} /> ))  : (data?.list_songs.map((item , index) => <ListSongItem item={item} section="suggested" key={index} />)) 
        }
      </div>
    </div>
  </div>
  )
}

export default SuggestSong