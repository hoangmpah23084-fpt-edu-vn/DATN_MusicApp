import SongCarouselItem from '@/components/Song-carousel-item'
import SongGenre from '@/components/SongGenre'
import { ifGenre } from '@/pages/Admin/Interface/validateAlbum'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

type Props = {}

const WantToListent = (props: Props) => {
  const [genre, setGenre] = useState<ifGenre[] | []>([])
  useEffect(() => {
    axios.get('http://localhost:8080/api/genre').then(({ data }) => setGenre(data.data))
  }, [])
  console.log(genre);

  return (
    <>
      {
        genre.length > 0 && genre.map(item => {
          const sliceItem = item.list_songs?.splice(0,5);
          console.log(sliceItem);
          
          return <div className="playlist-section home-recent mt-12">
            <div className="home-recent-title flex justify-between mb-[20px]">
              <h3 className="text-xl font-semibold capitalize">
                {item.name}
              </h3>
            </div>
            <div className="carousel-wrapper relative ">
              <div className="carousel flex -mx-[15px] overflow-hidden">
                <div className="carousel-container w-full grid grid-rows-1 grid-flow-col gap-4">
                  {
                    sliceItem?.map(itemList => <SongGenre item={itemList} />)
                  }
                </div>
              </div>
            </div>
          </div>
        })
      }
    </>

  )
}

export default WantToListent