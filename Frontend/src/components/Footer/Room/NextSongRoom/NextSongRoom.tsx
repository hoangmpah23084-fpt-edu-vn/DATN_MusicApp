import { ListItemButtonStyle, ListItemIconStyle } from '@/Mui/style/Footer/StyleAction';
import {  ifSong } from '@/pages/Admin/Interface/ValidateSong';
import { handChangeStateSong, handGetCurrentSong } from '@/store/Reducer/currentSong';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { RefObject } from 'react';
import { useParams } from 'react-router-dom';
import { Socket } from 'socket.io-client';

type Props = {
  ListData : ifSong[],
  socket : Socket,
  idRoom ?: string,
  audioRef: RefObject<HTMLAudioElement>
}

const NextSongRoom = ({ListData, socket, idRoom, audioRef} : Props) => {
  const {currentSong} = useAppSelector(({currentSong}) => currentSong);
  const {id} = useParams();
  const dispatch = useAppDispatch();
    const handNextSong = () => {
      const findIndexSong = ListData.findIndex((item) => item._id == currentSong?._id)
      const findSong = ListData.filter((_item, index) => findIndexSong + 1 == ListData.length ? index === 0 : index == findIndexSong + 1);
      dispatch(handGetCurrentSong(findSong[0]))
      localStorage.setItem("song",JSON.stringify(findSong[0]));
      dispatch(handChangeStateSong(false))
      setTimeout(() => {
        dispatch(handChangeStateSong(true)) 
        audioRef.current && audioRef.current?.play();
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