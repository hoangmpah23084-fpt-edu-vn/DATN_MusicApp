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
type Props = {
  sideBarRight: boolean,
}

const dataFake = [
  {
    id : 1,
    title: 'tile 1',
    link : "https://res.cloudinary.com/dsbiugddk/video/upload/v1695006432/audiofiles/q1wkpzc0dnvotblkk1le.mp3",
    state : false,
  },
  {
    id : 2,
    title: 'title 2',
    link : "https://res.cloudinary.com/dsbiugddk/video/upload/v1695049634/audiofiles/hwns7m56wj6tzs0necjz.mp3",
    state : false,
  }
]
interface IfData {
  id : number,
  link :string,
  title :string,
  state : boolean,
}

const SidebarSong = (props: Props) => {
  const [stateColor , setStateColor] = React.useState<boolean>(true);
  const [pause , setPause] = React.useState<boolean>(true);
  const [linkSongOld , setLinkSongOld] = React.useState<string>('');
  const [dataLocal, setDataLocal] = React.useState<IfData | undefined>(undefined)
  const classes = useStyles();
  const {  setLinkSong , setIndexLink, data, setData, setGlobalPause, globalPause } = SongStateContext();
  const stopPause = React.useCallback((value : IfData) => {
    console.log(' .test pause');
    console.log(value);
    localStorage.removeItem("song");
    setDataLocal(undefined);
    setPause(state => !state)
    setLinkSong(value.link);
    console.log("hahaha");
    setLinkSongOld(value.link)
    setGlobalPause(item => !item);
  },[props, setLinkSong, setGlobalPause, globalPause]);
  useEffect(() => { // init data
    setData(dataFake) 
    setIndexLink(0) // default index 0
    console.log("hello");
  },[])
   useEffect(() => {
      console.log('globalPause = ', globalPause)
   }, [globalPause])
  const handStart = React.useCallback((value : IfData, index: number) =>{
    console.log(' --test start')
    localStorage.setItem("song", JSON.stringify(value));
    const currentlocal : IfData  = JSON?.parse(localStorage?.getItem("song") || "");
    setDataLocal(currentlocal)
    setIndexLink(index)
    setPause(state => !state)
    setLinkSong(currentlocal.link);
    setGlobalPause(item => !item);
  },[props, setLinkSong, setGlobalPause, globalPause, dataLocal]);
  const handPlaylist = () => {
    setStateColor(true);
  }
  const handRecently = () => {
    setStateColor(false);
  }
  console.log(dataLocal, globalPause);
  
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
            { data && data?.length > 0 &&
              data.map((item, index) => {
                return <div className='w-full h-[60px] my-1 fjc hover:bg-[#b4b4b32d] cursor-pointer rounded-lg wall'>
                <div className='w-[95%] h-[80%] flex justify-between'>
                  <div className='w-[17%] h-full'>
                  <div className='absolute w-[47px] h-[45px] z-10 fjc pause'>
                  <PauseListItemButtonStyle  onClick={() => pause ?  handStart(item, index) : stopPause(item)}>
                      <PauseListItemIconStyle sx={{ border : "none", ":hover" : {
                        border : "none",
                        color : "#fff",
                        "& .MuiSvgIcon-root" : {
                          color : "#ffffffcf"
                      }
                      }}}>
                        {dataLocal && globalPause && dataLocal.id == item.id ? <PauseIcon className={classes.root} /> : <PlayArrowIcon className={classes.root} />}
                      </PauseListItemIconStyle>
                    </PauseListItemButtonStyle>
                  </div>
                    <div className='w-full h-full flex justify-start items-center relative wallSong'>
                      <img className='w-[90%] h-[90%] bg-cover rounded-[5px]' src='https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_jpeg/cover/f/9/4/3/f9436eb6a8ddb4fa7f93b106c3ad22c1.jpg' />
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