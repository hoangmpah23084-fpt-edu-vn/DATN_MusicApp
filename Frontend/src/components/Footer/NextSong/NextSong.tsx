import { ListItemButtonStyle, ListItemIconStyle } from '@/Mui/style/Footer/StyleAction';
import { ifSong } from '@/pages/Admin/Interface/ValidateSong';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  ListData : ifSong[],
  currentSong : ifSong | null,
  setCurrentSong: Dispatch<SetStateAction<ifSong | null>>
}

const NextSong = (props : Props) => {
  const {ListData, currentSong, setCurrentSong} = props;
    const handNextSong = () => {
        const findIndexSong = ListData.findIndex((item) => item._id == currentSong?._id)
        const findSong = ListData.filter((item, index) => index == findIndexSong + 1);
        setCurrentSong(findSong[0]);
        localStorage.setItem("song",JSON.stringify(findSong[0]));
    }
  return (
    <div className="w-[19%] h-[100%] ">
    <ListItemButtonStyle onClick={handNextSong}  >
      <ListItemIconStyle>
        <SkipNextIcon sx={{ color : "white"}} />
      </ListItemIconStyle>
    </ListItemButtonStyle>
  </div>
  )
}

export default NextSong