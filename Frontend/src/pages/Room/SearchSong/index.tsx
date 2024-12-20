import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { CiSearch } from "react-icons/ci";
import axios from 'axios';
import { ifSong } from '@/pages/Admin/Interface/ValidateSong';
import { chekcSubString } from '@/constane/song.const';
import { useParams } from 'react-router-dom';
import '../css.scss'
import { toast } from 'react-toastify';
import { Socket } from 'socket.io-client';
import { useDebouncedCallback } from 'use-debounce';
import currentSong from '@/store/Reducer/currentSong';
import { useAppDispatch } from '@/store/hooks';
import { AddSongInRoom } from '@/store/Reducer/roomReducer';

type Props = {
  listSong: ifSong[],
  socket : Socket,
  userRoom : any,
  admin : any
}
const SearchSongInRoom = ({listSong, socket, userRoom, admin}: Props) => {
const [listDataSearch , setListDataSearch] = useState<ifSong[] | []>([]);
const dispatch = useAppDispatch();
const {id} = useParams();
  
const debounced = useDebouncedCallback(
  async (value) => {
    if ((value.length as number) == 0) {
      await axios.get(`http://localhost:8080/api/Song?_limit=8&search=${value}`).then(({data}) => setListDataSearch(data.data));
    }else{
      await axios.get(`http://localhost:8080/api/Song?_limit=100&search=${value}`).then(({data}) => setListDataSearch(data.data));
    }
  },
  500,
  { maxWait: 2000 }
);
  const handAddSong = async (item : ifSong) => {
    if (listSong.find((element : ifSong) => element._id == item._id)) {
      toast.warning("Bài hát Đã Tồn tại")
    }else{
      dispatch(AddSongInRoom(item))
      // setListSong(prevList => [...prevList, item]);
      await axios.put(`http://localhost:8080/api/addSongInRoom/${id}`,item).then(({data}) => {
        console.log(data);
        toast.success(data.message);
      });
    }
    socket.emit('addSongInListRoom', { 
      idroom: id,
      song: item,
      listSong: listSong,
    })
  }

  return (
    <div className='w-full flex flex-col'>
      <div className='w-full flex justify-center items-center'>
        <CiSearch className="bg-[#3BC8E7] h-full w-[40px] p-2 rounded-l-full" />
        <input type="text" onChange={(e) => debounced(e.target.value)} className='w-full h-full text-black bg-white rounded-r-full outline-none focus:outline-none border-none px-[3px] w font-inter'
         autoComplete="off"
        placeholder='Search...' />
      </div>
    <div className='w-full overflow-y-scroll bg-[#1B2039] rounded-md p-2'>
        {
           listDataSearch.length > 0 && listDataSearch.map((item, index) => {
            return <div className='w-full flex' key={index}>
            <div className={`w-full h-[60px] flex justify-center rounded-md items-center hover:bg-[#b4b4b32d] cursor-pointer wall`} onClick={() => admin._id == userRoom._id ?  handAddSong(item) : ''}>
               <div className="w-[95%] h-[80%] flex justify-between ">
                    <div className="w-[17%] h-full">
                    <div className="w-full h-full flex justify-start items-center relative wallSong">
                          <img
                            className="w-[90%] h-[90%] bg-cover rounded-[5px]"
                            src={`${item.song_image[0]}`}
                          />
                    <div className="absolute w-[47px] h-[45px] top-[0] left-[-5px] z-10 fjc pause">
                          </div>
                        </div>
                      </div>
                      <div className="w-[88%] ml-[2%] h-full">
                        <div className="w-full h-[50%]">
                          <h1 className="font-semibold font-sans">{chekcSubString(item.song_name as string, 15)}</h1>
                        </div>
                        <div className="w-full h-[50%]">
                          <p className="text-gray-500 text-[12px] text-[#FFFFFF80] font-sans">
                            {item.song_singer}
                          </p>
                        </div>
                      </div>
                </div>
            </div>
           </div>
           }) 
        }
    </div>
    </div>
  )
}

export default SearchSongInRoom