import { ListItemButtonStyle, ListItemIconStyle } from '@/Mui/style/Footer/StyleAction'
import { ifSong } from '@/pages/Admin/Interface/ValidateSong';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  ListData : ifSong[],
  currentSong : ifSong | null,
  setCurrentSong: Dispatch<SetStateAction<ifSong | null>>
  setGlobalPause: Dispatch<SetStateAction<boolean>>
}
const PrevSong = (props : Props) => {
  const {ListData, currentSong, setCurrentSong, setGlobalPause} = props;
    const handPrevSong = () => {
      const getSongLocal = localStorage?.getItem("song") || ''
        if (getSongLocal) {
          const convertJson = JSON.parse(getSongLocal);
          const findIndexSong = ListData.findIndex((item) => item._id == convertJson?._id)
          const findSong = ListData.filter((item, index) => index == findIndexSong - 1);
          setCurrentSong(findSong[0]);
          localStorage.setItem("song",JSON.stringify(findSong[0]));
          setGlobalPause(false);
          setTimeout(() => {
            setGlobalPause(true);
          },500);
        }else{
          const findIndexSong = ListData.findIndex((item) => item._id == currentSong?._id)
          const findSong = ListData.filter((item, index) => index == findIndexSong - 1);
          setCurrentSong(findSong[0]);
          localStorage.setItem("song",JSON.stringify(findSong[0]));
          setGlobalPause(false);
          setTimeout(() => {
            setGlobalPause(true);
          },500);
        }
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

export default PrevSong