import { ListItemButtonStyle, ListItemIconStyle } from '@/Mui/style/Footer/StyleAction';
import { ifSong } from '@/pages/Admin/Interface/ValidateSong';
import { handChangeStateSong, handGetCurrentSong, setStateSong } from '@/store/Reducer/currentSong';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import SkipNextIcon from '@mui/icons-material/SkipNext';

type Props = {
  ListData: ifSong[],
}

const NextSong = ({ ListData }: Props) => {
  const { currentSong } = useAppSelector(({ currentSong }) => currentSong);
  const { song } = useAppSelector(({ Song }) => Song);

  const dispatch = useAppDispatch();
  const handNextSong = () => {
    const findIndexSong = ListData.findIndex((item) => item._id == currentSong?._id)
    const findSong = ListData.filter((_item, index) => findIndexSong + 1 == ListData.length ? index === 0 : index == findIndexSong + 1);
    dispatch(handGetCurrentSong(findSong[0]))
    localStorage.setItem("song", JSON.stringify(findSong[0]));
    dispatch(setStateSong(false))
    setTimeout(() => {
      dispatch(setStateSong(true))
    }, 500);
  }
  return (
    <div className="w-[19%] h-[100%] ">
      <ListItemButtonStyle onClick={handNextSong}>
        <ListItemIconStyle>
          <SkipNextIcon sx={{ color: "white" }} />
        </ListItemIconStyle>
      </ListItemButtonStyle>
    </div>
  )
}

export default NextSong