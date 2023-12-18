import { ListItemButtonStyle, ListItemIconStyle } from '@/Mui/style/Footer/StyleAction';
import {  ifSong } from '@/pages/Admin/Interface/ValidateSong';
import { handChangeStateSong, handGetCurrentSong, setCurrentSong, setStateSong } from '@/store/Reducer/currentSong';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import axios from 'axios';
import { RefObject } from 'react';
import { useParams } from 'react-router-dom';
import { Socket } from 'socket.io-client';

type Props = {
  socket : Socket,
  idRoom ?: string,
  audioRef: RefObject<HTMLAudioElement>
}

const NextSongRoom = ({socket, idRoom, audioRef} : Props) => {
  const {currentSong} = useAppSelector(({currentSong}) => currentSong);
  const { listSong  } = useAppSelector(({ room }) => room);
  const {id} = useParams();
  const dispatch = useAppDispatch();
    const handNextSong = async () => {
      const findIndexSong = listSong.findIndex((item) => item._id == currentSong?._id)
      const findSong = listSong.filter((_item, index) => findIndexSong + 1 == listSong.length ? index === 0 : index == findIndexSong + 1);
      dispatch(setCurrentSong(findSong[0]))
      axios.put(`http://localhost:8080/api/currentSongRoom/${idRoom}`, findSong[0]);
      localStorage.setItem("song",JSON.stringify(findSong[0]));
      dispatch(setStateSong(false))
      setTimeout(async () => {
        dispatch(setStateSong(true)) 
        audioRef.current?.play();
        // audioRef.current && await 
      },500);
      idRoom && socket.emit("emitNextClient", id);
    }
    
  return (
    <div className="w-[19%] h-[100%] ">
    <ListItemButtonStyle onClick={handNextSong}>
      <ListItemIconStyle>
        <SkipNextIcon sx={{ color : "white"}} />
      </ListItemIconStyle>
    </ListItemButtonStyle>
  </div>
  )
}

export default NextSongRoom