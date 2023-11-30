import React, { useEffect, useState } from 'react'
import Message from './Message'
import { listMessages } from '@/pages/Admin/Interface/Room'
import { Socket } from 'socket.io-client'
import ListSongInRoom from '../ListSong'
import SearchSongInRoom from '../SearchSong'
import '../css.scss';
import { useAppSelector } from '@/store/hooks'
import { useParams } from 'react-router-dom'
import { ifSong } from '@/pages/Admin/Interface/ValidateSong'
import axios from 'axios'

type Props = {
  listMess : listMessages[],
  socket : Socket,
  setListMess : React.Dispatch<React.SetStateAction<listMessages[]>>,
  setStateSideBar: React.Dispatch<React.SetStateAction<string>>,
  stateSideBar: string
}

const SideBarRoom = ({ listMess, socket, setListMess, setStateSideBar, stateSideBar }: Props) => {
  const [listSong, setListSong] = useState<ifSong[] | []>([]);
  const {id} = useParams();
  const { stateSong,currentSong } = useAppSelector(({ currentSong }) => currentSong);
  useEffect(() => {
      if (id) {
      axios.get(`http://localhost:8080/api/room/${id}`).then(({data}) => setListSong(data.data.listSong))
      }
      console.log("RENDER AGAIN DATA WHEN SET STATE");
      
  },[setListSong])
  
  return (
    <div className="zm-room-right-content absolute w-[340px] p-[20px] bg-[#130C1C] flex flex-col right-[30px] top-[94px] bottom-[30px] rounded-[12px] ">
    <div className="main-tabs text-[12px] mb-[12px]">
      <ul className="flex bg-[rgba(254,255,255,.1)] rounded-[15px] justify-center self-center p-[3px] max-w-max relative">
        <li onClick={() => setStateSideBar('trochuyen')} className={`tab-item tabSidebarSoom ${stateSideBar == 'trochuyen' ? 'bg-[rgba(254,255,255,.2)] ' : ''} cursor-pointer`} >
          Trò chuyện
        </li>
        <li onClick={() => setStateSideBar('listsong')} className={`tab-item tabSidebarSoom ${stateSideBar == 'listsong' ? 'bg-[rgba(254,255,255,.2)]' : '' }`}>
          Danh sách phát
        </li>
        <li onClick={() => setStateSideBar('search')} className={`tab-item tabSidebarSoom ${stateSideBar == 'search' ? 'bg-[rgba(254,255,255,.2)]' : '' }`}>
          Tìm kiếm
        </li>
      </ul>
    </div>
    {
      stateSideBar == 'trochuyen' ? <Message listMess={listMess} socket={socket} setListMess={setListMess} /> : ''
    }
    {
      stateSideBar == 'listsong' ? <ListSongInRoom stateSong={stateSong} socket={socket} currentSong={currentSong} listSong={listSong}  setListSong={setListSong} /> : ''
    }
    {
      stateSideBar == 'search' ? <SearchSongInRoom listSong={listSong} socket={socket} setListSong={setListSong} /> : ''
    }
  </div>

  )
}

export default SideBarRoom;