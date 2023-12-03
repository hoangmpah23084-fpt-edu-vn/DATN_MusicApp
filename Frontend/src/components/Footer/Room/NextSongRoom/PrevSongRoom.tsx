import { ListItemButtonStyle, ListItemIconStyle } from '@/Mui/style/Footer/StyleAction'
import { ifSong } from '@/pages/Admin/Interface/ValidateSong';
import { handChangeStateSong, handGetCurrentSong } from '@/store/Reducer/currentSong';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import { RefObject } from 'react';
import { useParams } from 'react-router-dom';
import { Socket } from 'socket.io-client';

type Props = {
  ListData : ifSong[],
  socket: Socket,
  idRoom ?: string,
  audioRef: RefObject<HTMLAudioElement>
}
const PrevSongRoom = ({ListData, socket, idRoom, audioRef} : Props) => {
  const {currentSong} = useAppSelector(({currentSong}) => currentSong);
  const dispatch = useAppDispatch();
  const {id} = useParams();
    const handPrevSong = () => {
      const findIndexSong = ListData.findIndex((item) => item._id == currentSong?._id);
      const findSong = ListData.filter((_item, index) => findIndexSong - 1 < 0 ? index === ListData.length - 1 : index == findIndexSong - 1);
      dispatch(handGetCurrentSong(findSong[0]))
      localStorage.setItem("song",JSON.stringify(findSong[0]));
      dispatch(handChangeStateSong(false)) 
      setTimeout(() => {
        dispatch(handChangeStateSong(true));
        audioRef.current && audioRef.current?.play();
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