import { ListItemButtonStyle, ListItemIconStyle } from '@/Mui/style/Footer/StyleAction'
import { ifSong } from '@/pages/Admin/Interface/ValidateSong';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  ListData : ifSong[],
  currentSong : ifSong | null,
  setCurrentSong: Dispatch<SetStateAction<ifSong | null>>
}
const PrevSong = (props : Props) => {
  const {ListData, currentSong, setCurrentSong} = props;
    const handNextSong = () => {
        const findIndexSong = ListData.findIndex((item) => item._id == currentSong?._id)
        const findSong = ListData.filter((item, index) => index == findIndexSong - 1);
        setCurrentSong(findSong[0]);
        localStorage.setItem("song",JSON.stringify(findSong[0]));
    }
  return (
    <div className="w-[19%] h-[100%] ">
    <ListItemButtonStyle onClick={handNextSong} >
      <ListItemIconStyle>
        <SkipPreviousIcon sx={{ color : "white"}} />
      </ListItemIconStyle>
    </ListItemButtonStyle>
  </div>
  )
}

export default PrevSong