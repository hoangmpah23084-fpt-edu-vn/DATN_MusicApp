import React, { useEffect, useState } from 'react'
import Message from './Message'
import { listMessages } from '@/pages/Admin/Interface/Room'
import { Socket } from 'socket.io-client'
import ListSongInRoom from '../ListSong'
import SearchSongInRoom from '../SearchSong'
import '../css.scss';
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { useParams } from 'react-router-dom'
import { ifSong } from '@/pages/Admin/Interface/ValidateSong'
import axios from 'axios'
import { setSongInRoom } from '@/store/Reducer/roomReducer'

type Props = {
  listMess : listMessages[],
  socket : Socket,
  setListMess : React.Dispatch<React.SetStateAction<listMessages[]>>,
  setStateSideBar: React.Dispatch<React.SetStateAction<string>>,
  stateSideBar: string,
  audioRef: React.RefObject<HTMLAudioElement>;
}

const SideBarRoom = ({ listMess, socket, setListMess, setStateSideBar, stateSideBar, audioRef }: Props) => {
  const {id} = useParams();
  const { stateSong,currentSong } = useAppSelector(({ currentSong }) => currentSong);
  const { listSong : listSongInroom } = useAppSelector(({ room }) => room);
  const dispatch = useAppDispatch();
  useEffect(() => {
      if (id) {
      axios.get(`http://localhost:8080/api/room/${id}`).then(({data}) => dispatch(setSongInRoom(data.data.listSong)))
      }
  },[dispatch])
  
  
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
      stateSideBar == 'listsong' ? <ListSongInRoom audioRef={audioRef} stateSong={stateSong} socket={socket} currentSong={currentSong} /> : ''
    }
    {
      stateSideBar == 'search' ? <SearchSongInRoom listSong={listSongInroom} socket={socket} /> : ''
    }
  </div>

  )
}

export default SideBarRoom;