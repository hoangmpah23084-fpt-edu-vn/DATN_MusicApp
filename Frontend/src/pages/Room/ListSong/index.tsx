import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import {
    ListItemButtonStyle,
    ListItemIconStyle,
    PauseListItemButtonStyle,
    PauseListItemIconStyle,
  } from "@/Mui/style/Footer/StyleAction";
import { useStyles } from '@/components/Footer';
import { activeSong, chekcSubString } from '@/constane/song.const';
import { FaRegTrashCan } from "react-icons/fa6";
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { ifSong } from '@/pages/Admin/Interface/ValidateSong';
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Dispatch, SetStateAction, useCallback, useEffect } from "react";
import { Socket } from "socket.io-client";
import { handChangeStateSong, handGetCurrentSong } from "@/store/Reducer/currentSong";
import { useDebouncedCallback } from "use-debounce";

type Props = {
  stateSong: boolean,
  currentSong: ifSong | null,
  listSong: ifSong[],
  socket : Socket,
  setListSong: Dispatch<SetStateAction<ifSong[]>>,
  audioRef: React.RefObject<HTMLAudioElement>;
}
const ListSongInRoom = ({stateSong, currentSong, socket, listSong, setListSong, audioRef}: Props) => {
    const classes = useStyles();
    const dispatch = useAppDispatch();
    const {id} = useParams();

    const handDeleteSongInRoom = (item : ifSong) => {
      if (item._id == currentSong?._id) {
        toast.warning('Không thẻ xóa bài hát được chọn')
        return;
      }else{
        axios.put<string , any>(`http://localhost:8080/api/dlSongInRoom/${id}`,item).then(({data}) => {
          if (data.message.trim().toLowerCase().includes('Phòng chỉ có một bài hát không thể xóa'.trim().toLowerCase())) {
            toast.warning(data.message)
            return;
          }else{
            setListSong(data.data.listSong);
            toast.success(data.message)
          }
        })
      }
      socket.emit('deleteSongInRoom', {
        idroom: id,
        songItem : item,
        listSong: listSong,
      })
    }
    
    const handToggSong = useCallback(async (item : ifSong) => {
      const preValue = stateSong;
      const formData = {
        idroom : id,
        song : item,
        stateSong : preValue
      }
      await dispatch(handGetCurrentSong(item));
      console.log(preValue);
      await dispatch(handChangeStateSong(!preValue));
      if (preValue && currentSong?._id == item._id) {
        console.log("stop");
        dispatch(handChangeStateSong(false))
        audioRef.current?.pause();
      }else{
        console.log("start");
        dispatch(handChangeStateSong(true))
        audioRef.current?.play();
      }
      socket.emit('clientStartSongSideBar', formData)
    },[dispatch, stateSong]);

    const handDelayPlay = useDebouncedCallback(() => {
      audioRef.current?.play();
    },500);

    useEffect(() => {
      if (id) {
        socket.on('serverStartSongSideBar', async (value) => {
          if (value) {
            const preValue = value.stateSong;
            await dispatch(handGetCurrentSong(value.song));
            await dispatch(handChangeStateSong(!preValue));
            if (!preValue) {
              dispatch(handChangeStateSong(true))
              console.log("start 1");
              handDelayPlay();
            }else{
              dispatch(handChangeStateSong(false))
              console.log("stop 1");
              audioRef.current?.pause();
            }
          }
        })
      }
    },[dispatch, stateSong]);

    useEffect(() => {
      socket.on('serverDeleteSongInRoom', (value) => {
        if (value) {
          const filterData = value.listSong.filter((item : ifSong) => item._id != value.songItem._id);
          setListSong(filterData)
        }
      })
    },[setListSong])
    
  return (
    <div className='w-full h-full overflow-y-scroll bg-[#130C1C] rounded-md p-2'>
        {
           listSong.length > 0 && listSong.map((item, index) => {
            return <div className='w-full flex' key={index}>
            <div className={`w-full h-[60px] flex justify-center rounded-md items-center ${
              currentSong && currentSong?._id == item._id ? 'bg-[#9B4DE0]' : 'hover:bg-[#b4b4b32d]'
            } wall`}>
               <div className="w-[95%] h-[80%] flex justify-between ">
                    <div className="w-[17%] h-full">
                    <div className="w-full h-full flex justify-start items-center relative wallSong">
                          <img
                            className="w-[90%] h-[90%] bg-cover rounded-[5px]"
                            src={`${item.song_image[0]}`}
                          />
                    <div className="absolute w-[47px] h-[45px] top-[0] left-[-5px] z-10 fjc pause">
                            <PauseListItemButtonStyle
                              onClick={() => handToggSong(item)}
                            >
                              <PauseListItemIconStyle
                                sx={{
                                  border: "none",
                                  ":hover": {
                                    border: "none",
                                    color: "#fff",
                                    "& .MuiSvgIcon-root": {
                                      color: "#ffffffcf",
                                    },
                                  },
                                }}
                              >
                                {currentSong &&
                                  stateSong &&
                                  currentSong?._id == item._id ? (
                                  <PauseIcon className={classes.root} />
                                ) : (
                                  <PlayArrowIcon className={classes.root} />
                                )}
                              </PauseListItemIconStyle>
                            </PauseListItemButtonStyle>
                          </div>
                        </div>
                      </div>
                      <div className="w-[48%] ml-[2%] h-full">
                        <div className="w-full h-[50%]">
                          <h1 className="font-semibold font-sans">{chekcSubString(item.song_name as string, 10)}</h1>
                        </div>
                        <div className="w-full h-[50%]">
                          <p className="text-gray-500 text-[12px] text-[#FFFFFF80] font-sans">
                            {item.song_singer}
                          </p>
                        </div>
                      </div>
                      <div className="w-[30%] h-full flex">
                        <div className="w-1/2">
                        </div>
                        <div className="w-1/2">
                          <ListItemButtonStyle onClick={() => handDeleteSongInRoom(item)} >
                            <ListItemIconStyle>
                              <FaRegTrashCan className='text-white text-[15px]'/>
                            </ListItemIconStyle>
                          </ListItemButtonStyle>
                        </div>
                      </div>
                </div>
            </div>
           </div>
           }) 
        }
    </div>
  )
}

export default ListSongInRoom