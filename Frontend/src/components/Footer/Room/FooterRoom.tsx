import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { Link } from "react-router-dom";
import ShuffleIcon from '@mui/icons-material/Shuffle';
import { ListItemButtonStyle, ListItemIconStyle, PauseListItemButtonStyle, PauseListItemIconStyle } from "@/Mui/style/Footer/StyleAction";
import RepeatIcon from '@mui/icons-material/Repeat';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Slider } from "@mui/material";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import { ifSong } from "@/pages/Admin/Interface/ValidateSong";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { handChangeStateSong, handGetCurrentSong } from "@/store/Reducer/currentSong";
import { ActiveFavourites, onhandleFavourite } from "@/constane/favourites.const";
import { chekcSubString } from "@/constane/song.const";
import { Socket, io } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { isAdminGroup, memberGroup } from "@/pages/Admin/Interface/Room";
import axios from "axios";
import { NextSongRoom, PrevSongRoom } from "./NextSongRoom";

// const connect = io("http://localhost:8080")
export const useStyles = makeStyles(() => createStyles({
  root: {
    color: "white",
    "&:hover": { color: "#3BC8E7" }
  },
}));
type Props = {
  ListData: ifSong[],
  setSideBarRight: Dispatch<SetStateAction<boolean>>,
  idRoom ?: string,
  listMember ?: memberGroup[] | [],
}

var socket: Socket<DefaultEventsMap, DefaultEventsMap>;
const FooterRoom = (props: Props) => {
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState('');
  const [rewindAudio, setRewindAudio] = useState<number>(0);
  const [volume, setVolume] = useState<number>(50);
  const [repeat, setRepeat] = useState(false);
  const [randomSong, setRandomSong] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const [admin, setAdmin] = useState<isAdminGroup>();
  const [member, setMember] = useState<isAdminGroup>();
  const audioRef = useRef<HTMLAudioElement>(null);
  const rewindRef = useRef<HTMLAudioElement>(null);
  const classes = useStyles();
  const [intervalId, setIntervalId] = useState<number | null>(null);
  const { currentSong } = useAppSelector(({ currentSong }) => currentSong);
  const { stateSong } = useAppSelector(({ currentSong }) => currentSong);
  const dispatch = useAppDispatch();
  
  const togglePlayPause = useCallback(() => {
  if (props.idRoom) {
    console.log("Đã Click Button");
    const preValue = stateSong;
    console.log("1");

    dispatch(handChangeStateSong(!preValue))
    console.log("2");

    if (!preValue) {
      const id = setInterval(() => {
        audioRef.current && setRewindAudio(audioRef.current?.currentTime);
        audioRef.current && setCurrentTime(SeconToMinuste(Number(audioRef.current.currentTime)));
      }, 1000);
      setIntervalId(id);
    } else {
      if (intervalId !== null) {
        clearInterval(intervalId);
        setIntervalId(null);
      }
    }
    socket.emit("toggPlayPause", {
      idroom : props.idRoom,
      listMember : props.listMember
    })
  }
  }, [dispatch, intervalId, stateSong])
  // , props.idRoom, props.listMember
  
  //todo handEventSocket.
  //! Send events to the Server
  useEffect(() => {
    if(props.idRoom) {
      socket = io("http://localhost:8080");
      const user = localStorage.getItem('user');
      if (user) {
        const convert = JSON.parse(user);
        setMember(convert)
        socket.emit('setUser', convert._id)
      }
      axios.get(`http://localhost:8080/api/room/${props.idRoom}`).then(({data}) =>  {
        setAdmin(data.data.isAdminGroup)
        socket.emit('joinRoom', data.data._id)
      });
    }
  },[])
  // dispatch, intervalId, stateSong, props.idRoom

  const SeconToMinuste = (secs: number) => {
    if (secs) {
      const minutes = Math.floor(secs / 60);
      const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const seconds = Math.floor(secs % 60);
      const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
      return `${returnedMinutes}:${returnedSeconds}`;
    } else {
      return "00:00"
    }
  }

  //todo: Start Receive events returned from the Server

  useEffect(() => {
    if (props.idRoom) {
      socket.on("recivedHandTogg", (value) => {
        console.log("Đã nhận value");
        if (value) {
          if (props.idRoom) {
            const preValue = stateSong;
            dispatch(handChangeStateSong(!preValue))
            if (!preValue) {
              const id = setInterval(() => {
                audioRef.current && setRewindAudio(audioRef.current?.currentTime);
                audioRef.current && setCurrentTime(SeconToMinuste(Number(audioRef.current.currentTime)));
              }, 1000);
              setIntervalId(id);
        
            } else {
              if (intervalId !== null) {
                clearInterval(intervalId);
                setIntervalId(null);
              }
            }
          }
        }
      });
    }
  },[dispatch, intervalId])
  // dispatch, intervalId, stateSong
  useEffect(() => {
    if (props.idRoom) {
      socket.on("emitNextServer", (value) => {
        if (value) {
          const findIndexSong = props.ListData.findIndex((item) => item._id == currentSong?._id)
          const findSong = props.ListData.filter((_item, index) => index == findIndexSong + 1);
          dispatch(handGetCurrentSong(findSong[0]))
          localStorage.setItem("song",JSON.stringify(findSong[0]));
          dispatch(handChangeStateSong(false))
          setTimeout(() => {
            dispatch(handChangeStateSong(true)) 
          },500);
        }
      })
      socket.on('emitPrevServer', value => {
        if (value) {
          const findIndexSong = props.ListData.findIndex((item) => item._id == currentSong?._id)
          const findSong = props.ListData.filter((_item, index) => index == findIndexSong - 1);
          dispatch(handGetCurrentSong(findSong[0]))
          localStorage.setItem("song",JSON.stringify(findSong[0]));
          dispatch(handChangeStateSong(false)) 
          setTimeout(() => {
            dispatch(handChangeStateSong(true)) 
          },500);
        }
      });
      socket.on("handRewindServer", value => {
        if (value) {
          if (audioRef.current) {
            audioRef.current.currentTime = Number(value.rewind);
            setRewindAudio(value.rewind as number);
            setCurrentTime(SeconToMinuste(Number(audioRef.current.currentTime)));
          }
          audioRef.current &&
            setCurrentTime(SeconToMinuste(Number(audioRef.current.currentTime)));
          setRewindAudio(value.rewind as number);
        }
      })
    }
  })
  // ,[dispatch, intervalId, stateSong, props.ListData, setCurrentTime, setRewindAudio]

  useEffect(() => {
    if (props.idRoom) {
      socket.on("randomSongServer", value => {
        if (value) {
          dispatch(handGetCurrentSong(value.song));
          localStorage.setItem('song', JSON.stringify(value.song));
          dispatch(handChangeStateSong(false));
        }
      })
    }
  },[dispatch])
  
  useEffect(() => {
    if (props.idRoom) {
      socket.on("repeatServer", value => {
        if (value) {
          setRepeat(!value.state);
        }
      })
    }
  },[])


  //todo: End Receive events returned from the Server
  useEffect(() => {
    const handleAudioEnd = () => {
        if (audioRef.current?.ended && duration > 0 && !repeat && !randomSong) {
            const findIndexSong = props.ListData.findIndex((item) => item._id === currentSong?._id);
            const findSong = props.ListData.filter((_item, index) => index === findIndexSong + 1);

            if (findSong.length > 0) {
                dispatch(handGetCurrentSong(findSong[0]));
                localStorage.setItem('song', JSON.stringify(findSong[0]));
                dispatch(handChangeStateSong(false));
                setTimeout(() => {
                    dispatch(handChangeStateSong(true));
                }, 500);
            }
        }
        if (audioRef.current?.ended && duration > 0 && randomSong) {
          const getUser = localStorage.getItem('user');
          if (getUser) {
            const parseUser = JSON.parse(getUser);
            if (admin && parseUser._id == admin._id) {
              const randomSong1 = props.ListData[Math.round(Math.random() * (props.ListData.length - 1))];
              socket.emit("randomSongClient", {
                idroom : props.idRoom,
                song : randomSong1
              });
              dispatch(handGetCurrentSong(randomSong1));
              localStorage.setItem('song', JSON.stringify(randomSong1));
              dispatch(handChangeStateSong(false));
              setTimeout(() => {
                  dispatch(handChangeStateSong(true));
              }, 500);
            }
          }
        }
    };

    const handleLoadedMetadata = () => {
        const audioDuration = audioRef.current?.duration;
        if (!isNaN(audioDuration as number) && (audioDuration as number) > 0) {
            setDuration(audioDuration as number);
        }
    };
    audioRef.current && audioRef.current.addEventListener("ended", handleAudioEnd);
    audioRef.current && audioRef.current.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
        audioRef.current?.removeEventListener("ended", handleAudioEnd);
        audioRef.current?.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
}, [audioRef, duration, repeat, randomSong, currentSong, dispatch, props.ListData]);


useEffect(() => {
    stateSong && audioRef.current && stateSong ? audioRef.current.play() : audioRef.current?.pause()
    if (stateSong) {
      const id = setInterval(() => {
        audioRef.current && setRewindAudio(audioRef.current?.currentTime);
        audioRef.current && setCurrentTime(SeconToMinuste(Number(audioRef.current.currentTime)));
      }, 1000);
      setIntervalId(id);
    }
    audioRef.current && (audioRef.current.loop = repeat);
    audioRef.current && (audioRef.current.volume = (volume / 100));
    if (audioRef.current) {
      audioRef.current.addEventListener("loadedmetadata", () => {
        audioRef.current && setDuration(audioRef.current.duration);
      });
    }
    setTimeout(() => {
      if (audioRef.current != null) {
        setCurrentTime(SeconToMinuste(Number(audioRef.current.currentTime)));
        setRewindAudio(audioRef.current.currentTime);
      }
    });
  }, [repeat, volume, stateSong, dispatch, currentSong, setCurrentTime]);

  const handChangeVolume = (_event: any, value: any) => {
    setVolume(value as number);
  };

  const handRewindAudio = ({value}: any) => {
    rewindRef.current &&
    rewindRef.current.addEventListener("mouseup", () => {
      if (audioRef.current) {
        audioRef.current.currentTime = Number(value);
        setRewindAudio(value as number);
        setCurrentTime(SeconToMinuste(Number(audioRef.current.currentTime)));
      }
    });
    audioRef.current &&
      setCurrentTime(SeconToMinuste(Number(audioRef.current.currentTime)));
    setRewindAudio(value as number);
    props.idRoom && socket.emit("handRewindClient", {
      idroom : props.idRoom,
      rewind : value
    })
  }

  const handRandomSong = () => {
    const preRandom = randomSong;
    setRandomSong(!preRandom);
    preRandom == false && setRepeat(false);
  }

  const handTurnVolume: any = () => {
    return volume > 0 ? setVolume(0) : setVolume(50);
  }
  
  const handchangeRepeat = () => {
    socket.emit("repeatClient", {
      idroom : props.idRoom,
      state : repeat
    })
    setRepeat((value) => !value)
  }
  // member && admin && 
  // ${admin?._id == member?._id ? '' : 'invisible'}
  return (
    <div
      className={`fixed z-50 w-[100%] bottom-0 bg-[#170f23] cursor-pointer `}>
      <div className="level text-white h-[90px] px-[20px] bg-[#130c1c]  border-t-[1px] border-[#32323d] flex">
        <div className="flex items-center justify-start w-[20%] h-[100%]">
          <div className="flex items-center w-[100%]">
            <div className="flex w-[100%] ">
              <div className="">
                <Link to={"#"}>
                  <div className="thumbnail-wrapper">
                    <div className="thumbnail w-[64px] h-[64px] mr-[10px]">
                      <img
                        src={currentSong?.song_image[0]}
                        alt=""
                        className="w-[100%] rounded-[5px]"
                      />
                    </div>
                  </div>
                </Link>
              </div>
              <div className="media-content flex justify-center items-start flex-col w-[40%] ">
                <div className="is-mark level-left">
                  <div className="song-info-wrapper">
                    <span className="song-title-item">
                      <Link to={"#"}>
                        <div className="title-wrapper">
                          <span className="item-title title text-[14px] text-[#fff]">
                            {chekcSubString(currentSong?.song_name as string)}
                          </span>
                        </div>
                      </Link>
                    </span>
                  </div>
                </div>
                <h3 className="is-one-line is-truncate subtitle  ">
                  <Link to={"#"}>
                    <div className="title-wrapper">
                      <span className="item-title title text-[13px] font-thin text-[#dadada]">
                        {currentSong?.song_singer}
                      </span>
                    </div>
                  </Link>
                </h3>
              </div>
              <div className="flex items-center justify-center w-[40%]">
                <div className="flex items-center justify-center ml-[20px] ">
                  <div className="level-item">
                    {/* <button className="bg" onClick={() => onhandleFavourite(dispatch, currentSong?._id as string)}>
                      <ActiveFavourites item={currentSong as ifSong} />
                    </button> */}
                  </div>
                  <div className="level-item ml-3">
                    <span id="np_menu">
                      <button className="zm-btn zm-tooltip-btn btn-more is-hover-circle button">
                        <BsThreeDots />
                      </button>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[60%] h-[100%] fjc">
          <div className="w-[70%] h-[100%] ">
            <div className="w-[100%] h-[70%] fjc">
              <div className="w-[40%] min-w-[200px] h-[75%] flex">
                <div className="w-[19%] h-[100%] ">
                  <ListItemButtonStyle onClick={handRandomSong} >
                    <ListItemIconStyle>
                      <ShuffleIcon sx={{ color: randomSong ? "#3BC8E7" : "white" }} />
                    </ListItemIconStyle>
                  </ListItemButtonStyle>
                </div>
                <PrevSongRoom ListData={props.ListData} socket={socket} idRoom={props.idRoom} />
                <div className="w-[24%] h-[100%] ">
                  <PauseListItemButtonStyle onClick={togglePlayPause} >
                    <PauseListItemIconStyle>
                      {stateSong ? (
                        <PauseIcon className={classes.root} />
                      ) : (
                        <PlayArrowIcon className={classes.root} />
                      )}
                    </PauseListItemIconStyle>
                  </PauseListItemButtonStyle>
                </div>
                <NextSongRoom ListData={props.ListData} socket={socket} idRoom={props.idRoom} />
                <div className="w-[19%] h-[100%] ">
                  <ListItemButtonStyle
                    onClick={handchangeRepeat}
                  >
                    <ListItemIconStyle>
                      <RepeatIcon
                        sx={{ color: repeat ? "#3BC8E7" : "white" }}
                      />
                    </ListItemIconStyle>
                  </ListItemButtonStyle>
                </div>
              </div>
            </div>
            <div className="w-[100%] h-[30%] flex justify-center items-start">
              <audio ref={audioRef} src={currentSong ? currentSong.song_link as string : ''} preload={"metadata"} autoPlay={false} />
              <div className="w-full h-[20px] flex justify-between">
                <div className="w-[6%] h-full fjc">
                  <p>{currentTime || "00:00"}</p>
                </div>
                <div className="w-[85%] h-full fjc">
                  <Slider
                    sx={{
                      color: "white",
                      "& .MuiSlider-thumb": {
                        width: "0px",
                        height: "0px",
                        "&:hover": {
                          width: "12px",
                          height: "12px",
                        },
                        "&:hover, &.Mui-focusVisible": {
                          width: "12px",
                          height: "12px",
                          boxShadow: "0px 0px 0px 8px rgb(255 255 255 / 16%)",
                        },
                      },
                      // min={0} step={1}
                    }}
                    value={rewindAudio}
                    max={duration}
                    ref={rewindRef}
                    onChange={(value) => handRewindAudio(value.target)}
                  />
                </div>
                <div className="w-[6%] h-full fjc">
                  {audioRef.current ? SeconToMinuste(audioRef.current?.duration) : 0}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[20%] h-[100%] flex items-center justify-between ">
          <div className="w-[80%] h-[40px]  flex justify-end items-center  ">
            <div className="w-[50%] h-[100%] flex ">
              <div className="w-[30%] h-[100%]">
                <ListItemButtonStyle onClick={() => handTurnVolume(volume, setVolume)} >
                  <ListItemIconStyle>
                    {volume <= 0 ? <VolumeOffIcon sx={{ color: "white" }} /> : <VolumeUpIcon sx={{ color: "white" }} />}
                  </ListItemIconStyle>
                </ListItemButtonStyle>
              </div>
              <div className="w-[65%] h-[100%] fjc ">
                <Slider
                  sx={{
                    color: "white",
                    "& .MuiSlider-thumb": {
                      width: "0px",
                      height: "0px",
                      transition: "0.1s cubic-bezier(.47,1.64,.41,.8)",
                      "&:hover": {
                        width: "12px",
                        height: "12px",
                      },
                      "&:hover, &.Mui-focusVisible": {
                        width: "12px",
                        height: "12px",
                        boxShadow: "0px 0px 0px 8px rgb(255 255 255 / 16%)",
                      },
                    },
                  }}
                  value={volume}
                  onChange={handChangeVolume}
                />
              </div>
            </div>
          </div>
          <div className="w-[1px] h-[35px] bg-[#dadada6c]"></div>
          <div className="w-[20%] h-[40px] fjc" >
            <ListItemButtonStyle sx={{
              "& .MuiTouchRipple-root": {
                display: "none"
              }
            }} onClick={() => {
              props.setSideBarRight(value => !value);
            }} >
              <ListItemIconStyle sx={{
                backgroundColor: "#3BC8E7", borderRadius: "5px",
                ":hover": {
                  backgroundColor: "#3BC8E7a3"
                }
              }} >
                <LibraryMusicIcon sx={{ color: "white" }} />
              </ListItemIconStyle>
            </ListItemButtonStyle>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterRoom;
