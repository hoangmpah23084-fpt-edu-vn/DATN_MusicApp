import { ListItemButtonStyle, ListItemIconStyle } from '@/Mui/style/Footer/StyleAction'
import { ifSong } from '@/pages/Admin/Interface/ValidateSong';
import { handChangeStateSong, handGetCurrentSong, setCurrentSong, setStateSong } from '@/store/Reducer/currentSong';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import axios from 'axios';
import { RefObject } from 'react';
import { useParams } from 'react-router-dom';
import { Socket } from 'socket.io-client';

type Props = {
  socket: Socket,
  idRoom ?: string,
  audioRef: RefObject<HTMLAudioElement>
}
const PrevSongRoom = ({socket, idRoom, audioRef} : Props) => {
  const {currentSong} = useAppSelector(({currentSong}) => currentSong);
  const { listSong  } = useAppSelector(({ room }) => room);
  const dispatch = useAppDispatch();
  const {id} = useParams();
    const handPrevSong = async () => {
      const findIndexSong = listSong.findIndex((item) => item._id == currentSong?._id);
      const findSong = listSong.filter((_item, index) => findIndexSong - 1 < 0 ? index === listSong.length - 1 : index == findIndexSong - 1);
      dispatch(setCurrentSong(findSong[0]))
      axios.put(`http://localhost:8080/api/currentSongRoom/${idRoom}`, findSong[0]);
      localStorage.setItem("song",JSON.stringify(findSong[0]));
      dispatch(setStateSong(false)) 
      setTimeout(() => {
        dispatch(setStateSong(true));
         audioRef.current?.play();
        //  audioRef.current && await
      },500);
      idRoom && socket.emit("emitPrevClient", id);
    }
  return (
    <div className="w-[19%] h-[100%] ">
    <ListItemButtonStyle onClick={handPrevSong} >
      <ListItemIconStyle>
        <SkipPreviousIcon sx={{ color : "white"}} />
      </ListItemIconStyle>
    </ListItemButtonStyle>
  </div>
  )
}

export default PrevSongRoom