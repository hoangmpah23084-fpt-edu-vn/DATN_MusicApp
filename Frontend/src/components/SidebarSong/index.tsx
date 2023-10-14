/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ListItemButtonStyle, ListItemIconStyle, PauseListItemButtonStyle, PauseListItemIconStyle } from '@/Mui/style/Footer/StyleAction'
import React, { useEffect } from 'react'
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useStyles } from '../Footer';
import { SongStateContext } from '../Context/SongProvider';
import { handGetSong } from '@/store/Reducer/Song';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { ifSong } from '@/pages/Admin/Interface/ValidateSong';
type Props = {
  sideBarRight: boolean,
}

const SidebarSong = (props: Props) => {
  const [stateColor , setStateColor] = React.useState<boolean>(true);
  // const [pause , setPause] = React.useState<boolean>(false);
  const [dataLocal, setDataLocal] = React.useState<ifSong | undefined>(undefined)
  const dispatch = useAppDispatch();
  const renderListSong = useAppSelector(({Song}) => Song);
  const classes = useStyles();
  
  const {setLinkSong , setIndexLink, setDataSong, setGlobalPause, globalPause } = SongStateContext();
  const stopPause = React.useCallback((value : ifSong) => {
    setDataLocal(undefined);
    // setPause(item => !item)
    setLinkSong(value.song_link as string);
    setGlobalPause(false);
  },[setLinkSong, setGlobalPause]);

  useEffect(() => { // init data
    setDataSong(renderListSong.song);
    void dispatch(handGetSong());
    const getlocal = localStorage?.getItem("song") || ""
    if (getlocal) {
      const currentlocal : ifSong  = JSON?.parse(getlocal);
        setDataLocal(currentlocal);
    }
    renderListSong.song.length > 0 && setLinkSong(renderListSong.song[0].song_link as string)
  },[dispatch, setDataSong, setLinkSong]);

//   useEffect(() => { // init data
//     renderListSong.song.length > 0 && setLinkSong(renderListSong.song[0].song_link as string) // default index 0
//  },[renderListSong, setLinkSong])

  const handStart = React.useCallback((value : ifSong, index: number) =>{
    localStorage.setItem("song", JSON.stringify(value));
    const currentlocal : ifSong  = JSON?.parse(localStorage?.getItem("song") || "");
    setDataLocal(currentlocal)
    setIndexLink(index)
    // setPause(true)
    setLinkSong(currentlocal.song_link as string);
    setGlobalPause(true);
  },[setIndexLink, setLinkSong, setGlobalPause]);
  const handPlaylist = () => {
    setStateColor(true);
  }
  const handRecently = () => {
    setStateColor(false);
  }
  return (
    <div className={`right-0 transition-all duration-700 ${props.sideBarRight ? "" : "fixed translate-x-[400px]"} sticky z-50  border-l-[1px] border-[#120822] text-white w-[600px] h-[660px] bg-[#120822] bottom-[90px] fjc`}>
      <div className='w-[93%] h-full'>
        <div className='w-full h-[10%] fjc'>
          <div className='w-full h-[50%]  flex'>
            <div className='w-[70%] h-full bg-[#2A2139] rounded-full flex'>
              <div className='w-[50%] h-full'>
                <button className={`text-[11px] transition-all  w-full rounded-full h-full ${stateColor ? "bg-[#6A6474] font-bold" : ""}`} onClick={() => handPlaylist()}>Danh sách phát</button>
              </div>
              <div className='w-[50%] h-full'>
              <button className={`text-[10px] transition-all w-full h-full rounded-full ${stateColor ? "" : "bg-[#6A6474] font-bold"}`} onClick={() => handRecently()} >Nghe gần đây</button>
              </div>
            </div>
            <div className='w-[30%] h-full flex'>
              <div className='w-[50%] h-full'>
                <ListItemButtonStyle>
                  <ListItemIconStyle>
                    <AccessAlarmIcon sx={{ color :  "white"}} />
                  </ListItemIconStyle>
                </ListItemButtonStyle>
              </div>
              <div className='w-[50%] h-full'>
              <ListItemButtonStyle >
                  <ListItemIconStyle>
                    <MoreHorizIcon sx={{ color :  "white"}} />
                  </ListItemIconStyle>
                </ListItemButtonStyle>
              </div>
            </div>
          </div>
        </div>
        <div className='w-full h-[10%] fjc'>
          <div className='w-full h-[90%] '>
            <div className='w-full h-[50%] flex items-center justify-start '>
              <h2 className='font-bold'>Tiếp Theo</h2>
            </div>
            <div className='w-full h-[50%]  flex justify-start items-center'>
              <h3>Từ danh sách bài hát <span className='text-[#c273ed]'>Mới phát hành</span></h3>
            </div>
          </div>
        </div>
        <div className='w-full h-full fjc'>
          <div className='w-full h-[100%] overflow-y-scroll'>
            { renderListSong && renderListSong.song?.length > 0 &&
              renderListSong.song.map((item : ifSong, index : number) => {
                return <div className={`w-full h-[60px] ${dataLocal && dataLocal?._id == item._id ? "bg-[#9B4DE0]" : "hover:bg-[#b4b4b32d]"} my-1 fjc  cursor-pointer rounded-lg wall`}>
                <div className='w-[95%] h-[80%] flex justify-between '>
                  <div className='w-[17%] h-full'>
                  <div className='absolute w-[47px] h-[45px] z-10 fjc pause'>
                  <PauseListItemButtonStyle  onClick={() => globalPause && dataLocal?._id == item._id ? stopPause(item)  :  handStart(item, index)}>
                      <PauseListItemIconStyle sx={{ border : "none", ":hover" : {
                        border : "none",
                        color : "#fff",
                        "& .MuiSvgIcon-root" : {
                          color : "#ffffffcf"
                      }
                      }}}>
                        { dataLocal && globalPause && dataLocal?._id == item._id ? <PauseIcon className={classes.root} /> : <PlayArrowIcon className={classes.root} />}
                      </PauseListItemIconStyle>
                    </PauseListItemButtonStyle>
                  </div>
                    <div className='w-full h-full flex justify-start items-center relative wallSong'>
                      <img className='w-[90%] h-[90%] bg-cover rounded-[5px]' src={`${item.song_image[0]}`} />
                    </div>
                  </div>
                  <div className='w-[48%] ml-[2%] h-full'>
                    <div className='w-full h-[50%]'>
                      <h1 className='font-semibold'>Somebody</h1>
                    </div>
                    <div className='w-full h-[50%]'>
                    <p className='text-gray-500 text-[12px]'>Dreamcatcher</p>
                    </div>
                  </div>
                  <div className='w-[30%] h-full flex'>
                    <div className='w-1/2'>
                    <ListItemButtonStyle >
                    <ListItemIconStyle>
                      <FavoriteBorderIcon sx={{ color :  "white", fontSize : "20px"}} />
                    </ListItemIconStyle>
                  </ListItemButtonStyle>
                    </div>
                    <div className='w-1/2'>
                    <ListItemButtonStyle >
                    <ListItemIconStyle>
                      <MoreHorizIcon sx={{ color :  "white", fontSize : "20px"}} />
                    </ListItemIconStyle>
                  </ListItemButtonStyle>
                    </div>
                  </div>
                </div>
              </div>
              })
            }

          </div>
        </div>
      </div> 
    </div>
  )
}

export default SidebarSong