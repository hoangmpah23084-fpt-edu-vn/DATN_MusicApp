import { ListItemButtonStyle, ListItemIconStyle } from '@/Mui/style/Footer/StyleAction';
import { SongStateContext } from '@/components/Context/SongProvider';
import { ifSong } from '@/pages/Admin/Interface/ValidateSong';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  ListData : ifSong[],
  currentSong : ifSong | null,
  setCurrentSong: Dispatch<SetStateAction<ifSong | null>>
  setGlobalPause :Dispatch<SetStateAction<boolean>>
}

const NextSong = (props : Props) => {
  const {ListData, currentSong, setCurrentSong, setGlobalPause} = props;

    const handNextSong = () => {
      const getSongLocal = localStorage?.getItem("song") || ''
        if (getSongLocal) {
          const convertJson = JSON.parse(getSongLocal);
          const findIndexSong = ListData.findIndex((item) => item._id == convertJson?._id)
          const findSong = ListData.filter((item, index) => index == findIndexSong + 1);
          setCurrentSong(findSong[0]);
          localStorage.setItem("song",JSON.stringify(findSong[0]));
          setGlobalPause(false);
          setTimeout(() => {
            setGlobalPause(true);
          },500);
        }else{
          const findIndexSong = ListData.findIndex((item) => item._id == currentSong?._id)
          const findSong = ListData.filter((item, index) => index == findIndexSong + 1);
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
    <ListItemButtonStyle onClick={handNextSong}>
      <ListItemIconStyle>
        <SkipNextIcon sx={{ color : "white"}} />
      </ListItemIconStyle>
    </ListItemButtonStyle>
  </div>
  )
}

export default NextSong