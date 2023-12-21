import { useCallback, useEffect, useRef, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
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
import { handGetCurrentSong, setCurrentSong, setStateSong } from "@/store/Reducer/currentSong";
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
const FooterRoom = ({ listMember, audioRef, idRoom }: Props) => {
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState('');
  const [rewindAudio, setRewindAudio] = useState<number>(0);
  const [volume, setVolume] = useState<number>(50);
  const [repeat, setRepeat] = useState(false);
  const [randomSong, setRandomSong] = useState(false);
  const [admin, setAdmin] = useState<isAdminGroup>()
  const [userLocal, setUserLocal] = useState<any | {}>({})
  const rewindRef = useRef<HTMLAudioElement>(null);
  const classes = useStyles();
  const { currentSong, stateSong } = useAppSelector(({ currentSong }) => currentSong);
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { listSong : ListData  } = useAppSelector(({ room }) => room);

  const handUpdateCurrentTime = () => {
    audioRef.current && audioRef.current.addEventListener("timeupdate", (value) => {
      setRewindAudio((value.target as HTMLAudioElement)?.currentTime);
      setCurrentTime(SeconToMinuste((value.target as HTMLAudioElement)?.currentTime));
    })
  }
  
  const togglePlayPause = async () => {
    if (idRoom) {
      const preValue = stateSong;
      if (!audioRef.current) {
        return;
      }
      dispatch(setStateSong(!preValue));
      if (preValue) {
        console.log("Pause FOoter");
        audioRef.current.pause();
      } else {
        console.log("Play FOoter");
        audioRef.current.play();
        audioRef.current && audioRef.current.addEventListener("timeupdate", (value) => {
          setRewindAudio((value.target as HTMLAudioElement)?.currentTime);
          setCurrentTime(SeconToMinuste((value.target as HTMLAudioElement)?.currentTime));
        })
      }
      socket.emit("toggPlayPause", {
        idroom: id,
        listMember: listMember,
        stateSong: preValue,
        song: currentSong
      })
    }
  }

  //todo handEventSocket.
  const debounced = useDebouncedCallback(async (value) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Number(value.rewind);
      setRewindAudio(value.rewind as number);
      setCurrentTime(SeconToMinuste(Number(audioRef.current.currentTime)));
      await audioRef.current?.play();
    }
    audioRef.current &&
      setCurrentTime(SeconToMinuste(Number(audioRef.current.currentTime)));
    setRewindAudio(value.rewind as number);
  },
    1000
  );


  //! Send events to the Server
  useEffect(() => {
    if (idRoom) {
      socket = io("http://localhost:8080");
      const user = localStorage.getItem('user');
      if (user) {
        const convert = JSON.parse(user);
        setUserLocal(convert);
        socket.emit('setUser', convert._id)
      }
      axios.get(`http://localhost:8080/api/room/${idRoom}`).then(({ data }) => {
        setAdmin(data.data.isAdminGroup)
        console.log("ID ROOM ON CLICENT : ", data.data._id);
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



  useEffect(() => {
    if (idRoom) {
      socket.on("recivedHandTogg", async (value) => {
        if (value) {
          const preValue = value.stateSong;
          if (!audioRef.current) {
            return;
          }
          dispatch(setCurrentSong(value.song));
          localStorage.setItem('song', JSON.stringify(value.song));
          if (!preValue) {
            // audioRef.current && await
            console.log("Chay ca 2");

            dispatch(setStateSong(true));
            audioRef.current.play();
            setTimeout(async () => {
              audioRef.current && audioRef.current.play();
            }, 500)
          } else {
            console.log("a11");
            dispatch(setStateSong(false));
            audioRef.current.pause();
          }
        }
      });
    }
  }, [stateSong]);
  // , [dispatch, stateSong]

  const debounceNextSong = useDebouncedCallback(async () => {
    audioRef.current?.play();
    setTimeout(async () => {
      dispatch(setStateSong(true));
      audioRef.current?.play();
    }, 500);
  }, 700)

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
      socket.on('emitPrevServer', async (value) => {
        if (value) {
          const findIndexSong = ListData.findIndex((item) => item._id == currentSong?._id)
          const findSong = ListData.filter((_item, index) => findIndexSong - 1 < 0 ? index === ListData.length - 1 : index == findIndexSong - 1);
          dispatch(handGetCurrentSong(findSong[0]))
          localStorage.setItem("song", JSON.stringify(findSong[0]));
          dispatch(setStateSong(false))
          debounceNextSong();
        }
      });
      socket.on("handRewindServer", value => {
        if (value) {
          debounced(value);
          if (stateSong == false) {
            dispatch(setStateSong(true));
          }
        }
      });
    }
  })
  // ,[dispatch, stateSong, ListData, setCurrentTime, setRewindAudio]

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


  const handleLoadedMetadata = () => {
    const audioDuration = audioRef.current?.duration;
    if (!isNaN(audioDuration as number) && (audioDuration as number) > 0) {
      setDuration(audioDuration as number);
    }
  };

  const handleAudioEnd = async () => {
    // console.log(randomSong);
    if (audioRef.current?.ended && duration > 0 && !repeat && !randomSong) {
      const findIndexSong = ListData.findIndex((item) => item._id === currentSong?._id);
      const nextIndex = (findIndexSong + 1) % ListData.length;
      console.log(nextIndex, findIndexSong);
      const findSong = ListData[nextIndex];
      dispatch(setCurrentSong(findSong))
      axios.put(`http://localhost:8080/api/currentSongRoom/${idRoom}`, findSong);
      localStorage.setItem('song', JSON.stringify(findSong));
      dispatch(setStateSong(false));
      setTimeout(async () => {
        dispatch(setStateSong(true));
        await audioRef.current?.play(); // Kích hoạt phát âm thanh
      }, 500);
    }
    if (audioRef.current?.ended && duration > 0 && randomSong) {
      if (getUser) {
        const parseUser = JSON.parse(getUser);
        if (admin && parseUser._id == admin._id) {
          const randomSong1 = ListData[Math.floor(Math.random() * ListData.length)];
          console.log('Chay vo random : ', randomSong1);
          dispatch(setCurrentSong(randomSong1))
          axios.put(`http://localhost:8080/api/currentSongRoom/${idRoom}`, randomSong1)
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
  useEffect(() => {
    const cb = async () => {
      if (audioRef.current && audioRef.current.currentTime >= audioRef.current.duration) {
        handleAudioEnd();
        setTimeout(async () => {
          await audioRef.current?.play();
        }, 1000)
      }
    }
    audioRef.current && audioRef.current.addEventListener("timeupdate", cb);
    audioRef.current && audioRef.current.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      audioRef.current?.removeEventListener("timeupdate", cb);
      audioRef.current?.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [audioRef, duration, repeat, currentSong, ListData, randomSong, idRoom, stateSong]);
  // dispatch
  // audioRef, duration, repeat, currentSong, dispatch, ListData, randomSong, idRoomx
  const debouncedRandomSong = useDebouncedCallback(() => {
    audioRef.current?.play();
    setTimeout(() => {
      audioRef.current?.play();
    }, 500);
  }, 1000);
  useEffect(() => {
    if (idRoom) {
      socket.on("randomSongServer", value => {
        const handAutoRandom = () => {
          localStorage.setItem('song', JSON.stringify(value.song));
          dispatch(setCurrentSong(value.song))
          debouncedRandomSong();
        }
        audioRef.current && audioRef.current?.addEventListener("ended", handAutoRandom);
        audioRef.current && audioRef.current?.addEventListener("loadedmetadata", handleLoadedMetadata);
        return () => {
          audioRef.current?.removeEventListener("ended", handAutoRandom);
          audioRef.current?.removeEventListener("loadedmetadata", handleLoadedMetadata);
        }
      })
    }
  }, [])

  useEffect(() => {
    if (stateSong) {
      handUpdateCurrentTime();
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

  const handRewindAudio = async ({ value }: any) => {
    rewindRef.current &&
      rewindRef.current.addEventListener("mouseup", () => {
        if (audioRef.current) {
          audioRef.current.currentTime = Number(value);
          setRewindAudio(value as number);
          setCurrentTime(SeconToMinuste(Number(audioRef.current.currentTime)));
        }
      });
    if (stateSong == false) {
      dispatch(setStateSong(true));
    }
    audioRef.current &&
      setCurrentTime(SeconToMinuste(Number(audioRef.current.currentTime)));
    setRewindAudio(value as number);
    await audioRef.current?.play();
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
      idroom: idRoom,
      stateRandom: preRandom
    })
  }
  useEffect(() => {
    socket.on("serverSetRandomSong", value => {
      if (value) {
        setRandomSong(!value.stateRandom);
        value.stateRandom == false && setRepeat(false);
      }
    })
  }, [])
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
  }, [setRandomSong, setRepeat])

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

  // SeconToMinuste
  //todo Check person 2 when join in room
  useEffect(() => {
    if (idRoom) {
      socket.on("Welcome", value => {
        if (value) {
          console.log("Join Rooom");
          console.log(audioRef.current && audioRef.current.currentTime);
          socket.emit("currentTimeSong", { idroom: idRoom, currentTime: audioRef.current && audioRef.current.currentTime, stateSong })
        }
      })
    }
  }, [])
  //todo server return curentime for person 2
  useEffect(() => {
    if (idRoom) {
      socket.on("serverCurrentTimeSong", async (value) => {
        if (value) {
          if (audioRef.current) {
            audioRef.current.currentTime = Number(value.currentTime);
          }
          // audioRef.current && await audioRef.current.play();
          console.log("chạy vô đây khi F5 trang");
          console.log(!value.stateSong);

          setCurrentTime(SeconToMinuste(Number(value.currentTime)));
          if (!value.stateSong) {
            dispatch(setStateSong(true));
            await audioRef.current?.play();
            setTimeout(() => {
              audioRef.current?.play();
            }, 500);
            handUpdateCurrentTime();
          } else {
            dispatch(setStateSong(false));
            audioRef.current?.pause();
            setRewindAudio(value.currentTime);
          }
        }
      })
    }
  }, [stateSong])

  //! Event F5 reload Page Start

  const handleBeforeUnload = () => {
    const playBackState = {
      currentTime: audioRef.current?.currentTime || 0,
      stateSong: stateSong,
      currentSong: currentSong
    };
    localStorage.setItem("playbackState", JSON.stringify(playBackState));
  };

  useEffect(() => {
    // Attach event listeners for beforeunload and unload events
    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("unload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("unload", handleBeforeUnload);
    };
  }, [stateSong]);

  useEffect(() => {
    if (audioRef.current) {
      const getplaybackState = localStorage.getItem("playbackState");
      if (!getplaybackState) return;

      const pausePlaybackState = JSON.parse(getplaybackState);

      // dispatch(setStateSong(pausePlaybackState.stateSong));
      dispatch(setCurrentSong(pausePlaybackState.currentSong));

      audioRef.current && (audioRef.current.currentTime = pausePlaybackState.currentTime);
      localStorage.removeItem("playbackState");
    }

  }, [stateSong]);


  //! Event F5 reload Page end

  return (
    <div
      className={`fixed z-50 w-[100%] bottom-0 bg-[#1B2039] cursor-pointer ${userLocal && admin && userLocal._id == admin._id ? 'visible' : 'invisible'}`}>
      <div className="level text-white h-[90px] px-[40px] bg-[#1B2039]  border-t-[1px] border-[#32323d] flex">
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
                        className="w-[100%] rounded-[5px] h-full"
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
                <PrevSongRoom audioRef={audioRef} socket={socket} idRoom={idRoom} />
                <div className="w-[24%] h-[100%] ">
                  <PauseListItemButtonStyle id="buttonToggle" onClick={async () => togglePlayPause()} >
                    {/* // togglePlayPause();
                    // if (stateSong == true) {
                    //   audioRef.current && audioRef.current.addEventListener("timeupdate", (value) => {
                    //     setRewindAudio((value.target as HTMLAudioElement)?.currentTime);
                    //     setCurrentTime(SeconToMinuste((value.target as HTMLAudioElement)?.currentTime));
                    //   })
                    // } */}
                    <PauseListItemIconStyle>
                      {stateSong ? (
                        <PauseIcon className={classes.root} />
                      ) : (
                        <PlayArrowIcon className={classes.root} />
                      )}
                    </PauseListItemIconStyle>
                  </PauseListItemButtonStyle>
                </div>
                <NextSongRoom audioRef={audioRef} socket={socket} idRoom={idRoom} />
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
              {/* preload={"metadata"} autoPlay={true} */}

              <audio ref={audioRef} src={currentSong ? currentSong.song_link as string : ''} id="sliderFooter" preload={"auto"} autoPlay={false} />
              <div className="w-full h-[20px] flex justify-between">
                <div className="w-[6%] h-full fjc">
                  <p>{currentTime}</p>
                  {/* {currentTime || "00:00"} */}
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
