import { useCallback, useEffect, useRef, useState } from "react";
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
import {  handGetCurrentSong, setCurrentSong, setStateSong } from "@/store/Reducer/currentSong";
import { chekcSubString } from "@/constane/song.const";
import { Socket, io } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { isAdminGroup, memberGroup } from "@/pages/Admin/Interface/Room";
import axios from "axios";
import { NextSongRoom, PrevSongRoom } from "./NextSongRoom";
import { useDebouncedCallback } from "use-debounce";
export const useStyles = makeStyles(() => createStyles({
  root: {
    color: "white",
    "&:hover": { color: "#3BC8E7" }
  },
}));
type Props = {
  ListData: ifSong[],
  idRoom?: string,
  listMember?: memberGroup[] | [],
  audioRef: React.RefObject<HTMLAudioElement>;
}

var socket: Socket<DefaultEventsMap, DefaultEventsMap>;
const FooterRoom = ({ listMember, ListData, audioRef, idRoom }: Props) => {
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState('');
  const [rewindAudio, setRewindAudio] = useState<number>(0);
  const [volume, setVolume] = useState<number>(50);
  const [repeat, setRepeat] = useState(false);
  const [randomSong, setRandomSong] = useState(false);
  const [admin, setAdmin] = useState<isAdminGroup>()
  const rewindRef = useRef<HTMLAudioElement>(null);
  const classes = useStyles();
  const [intervalId, setIntervalId] = useState<number | null>(null);
  const { currentSong,stateSong } = useAppSelector(({ currentSong }) => currentSong);
  const dispatch = useAppDispatch();

  const togglePlayPause = useCallback(() => {
    if (idRoom) {
      const preValue = stateSong;
      dispatch(setStateSong(!preValue));
      if (!preValue) {
        audioRef.current && audioRef.current.play();
        const id = setInterval(() => {
          audioRef.current && setRewindAudio(audioRef.current?.currentTime);
          audioRef.current && setCurrentTime(SeconToMinuste(Number(audioRef.current.currentTime)));
        }, 1000);
        setIntervalId(id);
      } else {
        if (intervalId !== null) {
          console.log("a11");
          audioRef.current && audioRef.current.pause();
          clearInterval(intervalId);
          setIntervalId(null);
        }
      }
      socket.emit("toggPlayPause", {
        idroom: idRoom,
        listMember: listMember,
        stateSong: preValue
      })
    }
  }, [dispatch, intervalId, stateSong])

  //todo handEventSocket.
  const debounced = useDebouncedCallback(
    // function
    (value) => {
      if (audioRef.current) {
        audioRef.current.currentTime = Number(value.rewind);
        setRewindAudio(value.rewind as number);
        setCurrentTime(SeconToMinuste(Number(audioRef.current.currentTime)));
        audioRef.current?.play();
      }
      audioRef.current &&
        setCurrentTime(SeconToMinuste(Number(audioRef.current.currentTime)));
      setRewindAudio(value.rewind as number);
    },
    // delay in ms
    1000
  );

  //! Send events to the Server
  useEffect(() => {
    if (idRoom) {
      socket = io("http://localhost:8080");
      const user = localStorage.getItem('user');
      if (user) {
        const convert = JSON.parse(user);
        socket.emit('setUser', convert._id)
      }
      axios.get(`http://localhost:8080/api/room/${idRoom}`).then(({ data }) => {
        setAdmin(data.data.isAdminGroup)
        socket.emit('joinRoom', data.data._id)
      });
    }
  }, [])

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
  //todo: Start Receive events returned from the Server;

  const debouncedClick = useDebouncedCallback(
    () => {
      audioRef.current && audioRef.current.play();
      const id = setInterval(() => {
        audioRef.current && setRewindAudio(audioRef.current?.currentTime);
        audioRef.current && setCurrentTime(SeconToMinuste(Number(audioRef.current.currentTime)));
      }, 1000);
      setIntervalId(id);
      console.log("play");
    },
    500
  );
  useEffect(() => {
    if (idRoom) {
      socket.on("recivedHandTogg", async (value) => {
        if (value) {
          const preValue = value.stateSong;
          dispatch(setStateSong(!value.stateSong))
          if (!preValue) {
            console.log("Play Server");
            debouncedClick();
            localStorage.setItem('song', JSON.stringify(currentSong));
          }else{
            audioRef.current &&audioRef.current.pause(); 
            console.log("pause Server");
            intervalId && clearInterval(intervalId);
            setIntervalId(null);
          }
        }
      });
    }
  }, [dispatch]);
  // ,[dispatch, intervalId, stateSong]

  const debounceNextSong = useDebouncedCallback(() => {
    dispatch(setStateSong(true));
    audioRef.current && audioRef.current?.play();
  },700)

  useEffect(() => {
    if (idRoom) {
      socket.on("emitNextServer", (value) => {
        if (value) {
          const findIndexSong = ListData.findIndex((item) => item._id === currentSong?._id);
          const nextIndex = (findIndexSong + 1) % ListData.length;  // Đảm bảo lặp lại nếu vượt quá giới hạn
          const findSong = ListData[nextIndex];
          dispatch(handGetCurrentSong(findSong));
          localStorage.setItem("song", JSON.stringify(findSong));
          dispatch(setStateSong(false));
          debounceNextSong()
        }
      })
      socket.on('emitPrevServer', value => {
        if (value) {
          const findIndexSong = ListData.findIndex((item) => item._id == currentSong?._id)
          const findSong = ListData.filter((_item, index) => findIndexSong - 1 < 0 ? index === ListData.length - 1 : index == findIndexSong - 1);
          dispatch(handGetCurrentSong(findSong[0]))
          localStorage.setItem("song", JSON.stringify(findSong[0]));
          dispatch(setStateSong(false))
          setTimeout(() => {
            dispatch(setStateSong(true));
            audioRef.current && audioRef.current?.play();
          }, 500);
        }
      });
      socket.on("handRewindServer", value => {
        if (value) {
          debounced(value);
        }
      });
    }
  })
  // ,[dispatch, intervalId, stateSong, ListData, setCurrentTime, setRewindAudio]

  useEffect(() => {
    if (idRoom) {
      socket.on("repeatServer", value => {
        if (value) {
          setRandomSong(false);
          setRepeat(!value.state);
        }
      })
    }
  }, [])
  // ,[stateSong, dispatch]

  //todo: End Receive events returned from the Server
  const getUser = localStorage.getItem('user');

  const handleAudioEnd = () => {
    console.log(randomSong);
    if (audioRef.current?.ended && duration > 0 && !repeat && !randomSong) {
        const findIndexSong = ListData.findIndex((item) => item._id === currentSong?._id);
        const nextIndex = (findIndexSong + 1) % ListData.length;
        console.log(nextIndex, findIndexSong);
        const findSong = ListData[nextIndex];
        dispatch(setCurrentSong(findSong))
        localStorage.setItem('song', JSON.stringify(findSong));
        dispatch(setStateSong(false));
        setTimeout(() => {
          dispatch(setStateSong(true));
          audioRef.current?.play(); // Kích hoạt phát âm thanh
        }, 500);
    }
    if (audioRef.current?.ended && duration > 0 && randomSong) {
      if (getUser) {
        const parseUser = JSON.parse(getUser);
        if (admin && parseUser._id == admin._id) {
          const randomSong1 = ListData[Math.floor(Math.random() * ListData.length)];
          console.log('Chay vo random : ', randomSong1);
          dispatch(setCurrentSong(randomSong1))
          localStorage.setItem('song', JSON.stringify(randomSong1));
          dispatch(setStateSong(false));
          setTimeout(() => {
            dispatch(setStateSong(true));
          }, 500);
          socket.emit("randomSongClient", {
            idroom: idRoom,
            song: randomSong1
          });
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

  useEffect(() => {
    const cb = () => {
      if(audioRef.current && audioRef.current.currentTime >= audioRef.current.duration) {
        handleAudioEnd();
        setTimeout(() => {
          audioRef.current?.play();
        }, 1000)
      }
    }
    console.log(randomSong);
    
    audioRef.current && audioRef.current.addEventListener("timeupdate", cb);
    audioRef.current && audioRef.current.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      audioRef.current?.removeEventListener("timeupdate", cb);
      audioRef.current?.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [audioRef, duration, repeat, currentSong, dispatch, ListData, randomSong, idRoom]);
  useEffect(() => {
    if (idRoom) {
      socket.on("randomSongServer", value => {
        dispatch(setCurrentSong(value.song))
        const handAutoRandom = () => {
          localStorage.setItem('song', JSON.stringify(value.song));
          setTimeout(() => {
            audioRef.current?.play();
          }, 500);
        }
        audioRef.current && audioRef.current?.addEventListener("ended", handAutoRandom);
        audioRef.current && audioRef.current?.addEventListener("loadedmetadata", handleLoadedMetadata);
        // handAutoRandom(value.song)
        return () => {
          audioRef.current?.removeEventListener("ended", handAutoRandom);
          audioRef.current?.removeEventListener("loadedmetadata", handleLoadedMetadata);   
        }
      })
    }
  }, [])

  useEffect(() => {
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

  const handRewindAudio = ({ value }: any) => {
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
    audioRef.current?.play();
    idRoom && socket.emit("handRewindClient", {
      idroom: idRoom,
      rewind: value
    })
  }

  const handRandomSong = () => {
    const preRandom = randomSong;
    setRandomSong(!preRandom);
    preRandom == false && setRepeat(false);
    socket.emit('setRandomSong', {
      idroom : idRoom,
      stateRandom : preRandom
    })
  }
  useEffect(() => {
    if (idRoom) {
      socket.on('serverSetRandomSong', value => {
        if (value) {
        const preRandom = value.stateRandom;
        console.log(preRandom);
        setRandomSong(!preRandom);
        preRandom == false && setRepeat(false);
        }
      })
    }
  },[setRandomSong,setRepeat])

  const handTurnVolume: any = () => {
    return volume > 0 ? setVolume(0) : setVolume(50);
  }
  const handchangeRepeat = () => {
    socket.emit("repeatClient", {
      idroom: idRoom,
      state: repeat
    })
    setRandomSong(false);
    setRepeat((value) => !value)
  }
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
                            {chekcSubString(currentSong?.song_name as string, 15)}
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
                <PrevSongRoom ListData={ListData} audioRef={audioRef} socket={socket} idRoom={idRoom} />
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
                <NextSongRoom ListData={ListData} audioRef={audioRef} socket={socket} idRoom={idRoom} />
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
              <audio ref={audioRef} src={currentSong ? currentSong.song_link as string : ''} id="sliderFooter" preload={"metadata"} autoPlay={false}/>
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
