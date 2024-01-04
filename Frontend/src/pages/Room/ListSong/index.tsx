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
import { handChangeStateSong, handGetCurrentSong, setCurrentSong, setStateSong } from "@/store/Reducer/currentSong";
import { useDebouncedCallback } from "use-debounce";
import { AddSongInRoom, DeleteSongInRoom } from "@/store/Reducer/roomReducer";

type Props = {
  stateSong: boolean,
  currentSong: ifSong | null,
  socket : Socket,
  audioRef: React.RefObject<HTMLAudioElement>;
  admin : any,        
  userRoom: any
}
const ListSongInRoom = ({stateSong, currentSong, socket, audioRef, admin, userRoom}: Props) => {
    const classes = useStyles();
    const dispatch = useAppDispatch();
    const {id} = useParams();
    const { listSong  } = useAppSelector(({ room }) => room);
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
            dispatch(DeleteSongInRoom(item))
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
    console.log(admin, userRoom);
    
    const handToggSong = async (item : ifSong) => {
      const preValue = stateSong;
      const formData = {
        idroom : id,
        song : item,
        stateSong : preValue,
        currentSong : currentSong
      }
      dispatch(setCurrentSong(item));
      axios.put(`http://localhost:8080/api/currentSongRoom/${id}`, item)
      localStorage.setItem('song', JSON.stringify(item));
      if (preValue && currentSong?._id == item._id) {
        console.log("stop");
        dispatch(setStateSong(false))
        audioRef.current?.pause();
      }else{
        console.log("start");
        dispatch(setStateSong(true))
        audioRef.current && audioRef.current.play();
        setTimeout(() => {
         audioRef.current && audioRef.current.play();
       },500)
      }
      socket.emit('clientStartSongSideBar', formData)
    }
    
    useEffect(() => {
      if (id) {
        socket.on('serverStartSongSideBar', async (value) => {
          if (value) {
            console.log(value);
            // await handToggSongServer(value.song);
            const preValue = value.stateSong;
            dispatch(setCurrentSong(value.song));
            localStorage.setItem('song', JSON.stringify(value.song));
            //  dispatch(setStateSong(!preValue));
            if (preValue && value.currentSong?._id == value.song._id) {
              console.log("stop side bar Song server");
              dispatch(setStateSong(false))
               audioRef.current?.pause();
            }else{
              console.log("start side bar Song server");
              dispatch(setStateSong(true))
              console.log(audioRef.current, "xxxxxxxxxx");
              audioRef.current && audioRef.current.play();
               setTimeout(() => {
                audioRef.current && audioRef.current.play();
              },500)
            }
          }
        })
      }
    },[]);
    // ,[dispatch, stateSong]

    useEffect(() => {
      if (id) {
        socket.on('serverAddSongInListRoom', (value) => {
          dispatch(AddSongInRoom(value.song))
        });
      }
    }, []);


    useEffect(() => {
      socket.on('serverDeleteSongInRoom', (value) => {
        if (value) {
          dispatch(DeleteSongInRoom(value.songItem))
          // const filterData = value.listSong.filter((item : ifSong) => item._id != value.songItem._id);
          // setListSong(filterData)
        }
      })
    },[])
    
  return (
    <div className='w-full h-full overflow-y-scroll bg-[#1B2039] rounded-md p-2'>
        {
           listSong.length > 0 && listSong.map((item, index) => {
            // console.log(item);
            
            return <div className='w-full flex' key={index}>
            <div className={`w-full h-[60px] flex justify-center rounded-md items-center ${
              currentSong && currentSong?._id == item._id ? 'bg-[#092635]' : 'hover:bg-[#b4b4b32d]'
            } wall`}>
               <div className="w-[95%] h-[80%] flex justify-between ">
                    <div className="w-[17%] h-full">
                    <div className="w-full h-full flex justify-start items-center relative wallSong">
                          <img
                            className="w-[90%] h-[90%] bg-cover rounded-[5px]"
                            src={`${item.song_image[0]}`}
                          />
                    <div className={`absolute w-[47px] h-[45px] top-[0] left-[-5px] z-10 fjc pause ${admin._id == userRoom._id ? 'visible' : 'invisible'}`}>
                    {/* handToggSong(item) */}
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
                            {/* {item.song_singer} */}
                          </p>
                        </div>
                      </div>
                      <div className="w-[30%] h-full flex">
                        <div className="w-1/2">
                        </div>
                        <div className="w-1/2">
                          <ListItemButtonStyle onClick={() => handDeleteSongInRoom(item)} className={`${admin._id == userRoom._id ? 'visible' : 'invisible'}`} >
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