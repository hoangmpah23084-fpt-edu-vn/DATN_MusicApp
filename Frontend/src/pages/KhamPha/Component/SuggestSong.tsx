import ListSongItem from '@/components/List-songs-item'
import React from 'react'

type Props = {}

const SuggestSong = (props: Props) => {
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
        <ListSongItem section="suggested" />
        <ListSongItem section="suggested" />
        <ListSongItem section="suggested" />
        <ListSongItem section="suggested" />
        <ListSongItem section="suggested" />
        <ListSongItem section="suggested" />
        <ListSongItem section="suggested" />
        <ListSongItem section="suggested" />
        <ListSongItem section="suggested" />
      </div>
    </div>
  </div>
  )
}

export default SuggestSong