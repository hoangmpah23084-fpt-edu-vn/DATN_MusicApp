import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { BsThreeDots } from "react-icons/bs";
import { Link } from "react-router-dom";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import {
  ListItemButtonStyle,
  ListItemIconStyle,
  PauseListItemButtonStyle,
  PauseListItemIconStyle,
} from "@/Mui/style/Footer/StyleAction";
import RepeatIcon from "@mui/icons-material/Repeat";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Slider } from "@mui/material";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import { NextSong, PrevSong } from "./NextSong";
import { ifSong } from "@/pages/Admin/Interface/ValidateSong";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  handChangeStateSong,
  handGetCurrentSong,
  setStateSong,
} from "@/store/Reducer/currentSong";
import {
  ActiveFavourites,
  onhandleFavourite,
} from "@/constane/favourites.const";
import { chekcSubString, checkLengthNameSong } from "@/constane/song.const";
import { RootState } from "@/store/store";
import axios from "axios";
import { toast } from "react-toastify";
import "./css.scss";
import { setSongHistory } from "@/store/Reducer/Song";
// const connect = io("http://localhost:8080")
export const useStyles = makeStyles(() =>
  createStyles({
    root: {
      color: "white",
      "&:hover": { color: "#3BC8E7" },
    },
  })
);
type Props = {
  ListData: ifSong[];
  setSideBarRight: Dispatch<SetStateAction<boolean>>;
};

const Footer = (props: Props) => {
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState("");
  const [rewindAudio, setRewindAudio] = useState<number>(0);
  const [volume, setVolume] = useState<number>(50);
  const [repeat, setRepeat] = useState(false);
  const [randomSong, setRandomSong] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const rewindRef = useRef<HTMLAudioElement>(null);
  const classes = useStyles();
  const { currentSong } = useAppSelector(({ currentSong }) => currentSong);
  const { stateSong } = useAppSelector(({ currentSong }) => currentSong);

  const [totalTiming, setTotalTiming] = useState<number>(0);
  const token = localStorage.getItem('token')

  const dispatch = useAppDispatch();

  const handUpdateCurrentTime = () => {
    audioRef.current && audioRef.current.addEventListener("timeupdate", (value) => {
      setRewindAudio((value.target as HTMLAudioElement)?.currentTime);
      setCurrentTime(SeconToMinuste((value.target as HTMLAudioElement)?.currentTime));
    })
  }

  const togglePlayPause = useCallback(async () => {
    const preValue = stateSong;
    dispatch(setStateSong(!preValue));
    if (!preValue) {
      await audioRef.current?.play();
      handUpdateCurrentTime();
    } else {
      await audioRef.current?.pause();
    }
  }, [dispatch, stateSong]);
  const SeconToMinuste = (secs: number) => {
    if (secs) {
      const minutes = Math.floor(secs / 60);
      const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const seconds = Math.floor(secs % 60);
      const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
      return `${returnedMinutes}:${returnedSeconds}`;
    } else {
      return "00:00";
    }
  };
  useEffect(() => {
    const handleAudioEnd = () => {
      if (audioRef.current?.ended && duration > 0 && !repeat && !randomSong) {
        const findIndexSong = props.ListData.findIndex(
          (item) => item._id === currentSong?._id
        );
        const findSong = props.ListData.filter(
          (_item, index) => index === findIndexSong + 1
        );

        if (findSong.length > 0) {
          dispatch(handGetCurrentSong(findSong[0]));
          localStorage.setItem("song", JSON.stringify(findSong[0]));
          console.log("Đây là lỗi Tự động chuyển");
          dispatch(setStateSong(false));
          setTimeout(() => {
            dispatch(setStateSong(true));
          }, 500);
        }
      }
      if (audioRef.current?.ended && duration > 0 && randomSong) {
        const randomSong1 =
          props.ListData[
          Math.round(Math.random() * (props.ListData.length - 1))
          ];
        dispatch(handGetCurrentSong(randomSong1));
        localStorage.setItem("song", JSON.stringify(randomSong1));
        dispatch(setStateSong(false));
        setTimeout(() => {
          dispatch(setStateSong(true));
        }, 500);
      }
    };

    const handleLoadedMetadata = () => {
      const audioDuration = audioRef.current?.duration;
      if (!isNaN(audioDuration as number) && (audioDuration as number) > 0) {
        setDuration(audioDuration as number);
      }
    };

    audioRef.current &&
      audioRef.current.addEventListener("ended", handleAudioEnd);
    audioRef.current &&
      audioRef.current.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      audioRef.current?.removeEventListener("ended", handleAudioEnd);
      audioRef.current?.removeEventListener(
        "loadedmetadata",
        handleLoadedMetadata
      );
    };
  }, [
    audioRef,
    duration,
    repeat,
    randomSong,
    currentSong,
    dispatch,
    props.ListData,
  ]);
  // console.log(currentSong);
  

  useEffect(() => {
    if (audioRef.current) {
      setTotalTiming(audioRef.current.currentTime);
      const percent = (30 / 100) * audioRef.current.duration;
      console.log(percent);
      console.log(Math.floor(totalTiming) == Math.floor(percent));

      if (Math.floor(totalTiming) == Math.floor(percent)) {
        axios
          .put(`http://localhost:8080/api/Song/updateView/${currentSong?._id}`)
          .then(() => {
            toast.success("Tăng view thành công");
          })
          .catch(() => {
            toast.error("Tăng view thất bại");
          });
      }
    }
  }, [currentTime]);

  useEffect(() => {
    stateSong ? audioRef.current?.play() : audioRef.current?.pause();
    if (stateSong) {
      handUpdateCurrentTime();
    }
    audioRef.current && (audioRef.current.loop = repeat);
    audioRef.current && (audioRef.current.volume = volume / 100);
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
  }, [repeat, volume, stateSong, dispatch, currentSong]);

  const handChangeVolume = (_event: any, value: any) => {
    setVolume(value as number);
  };

  const handRewindAudio = (_event: any, value: any) => {
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
  };
  const handRandomSong = () => {
    const preRandom = randomSong;
    setRandomSong(!preRandom);
    preRandom == false && setRepeat(false);
  };
  const handTurnVolume: any = () => {
    return volume > 0 ? setVolume(0) : setVolume(50);
  };

  const songLoca = localStorage.getItem("song");
  useEffect(() => {
    if (songLoca) {
      const history = localStorage.getItem("history");
      if (!history) {
        localStorage.setItem("history", JSON.stringify([songLoca]));
      } else {
        const historyArray = JSON.parse(history);
        if (!historyArray.includes(songLoca)) {
          historyArray.unshift(songLoca);
          if (historyArray.length > 20) {
            historyArray.pop();
          }
          localStorage.setItem("history", JSON.stringify(historyArray));
        }
      }
    }
    dispatch(setSongHistory())
  }, [songLoca]);

  const maxlength = 14;

  return (
    <>
      <div
        // onClick={() => {
        //   setLiveRoom((value) => !value);
        //   props.setLiveRoom((value) => !value);
        // }}
        className="fixed z-50 w-[100%] bottom-[60px] sm:bottom-0 bg-[#1B2039] cursor-pointer"
      >
        <div className="level text-white h-[70px] px-[15px] sm:h-[90px] sm:px-[20px] bg-[#1B2039]  border-t-[1px] border-[#32323d] flex justify-between">
          <div className="flex items-center rounded-r-lg flex-1 w-[60%] justify-start md:w-[30%] h-[100%] bg-[#1B2039]">
            <div className="flex items-center w-[100%]">
              <div className="flex w-[100%] justify-between">
                <div className="">
                  <Link to={"#"}>
                    <div className="thumbnail-wrapper">
                      <div className="thumbnail w-[60px] h-[60px] sm:w-[64px] sm:h-[64px] mr-[8px]">
                        <img
                          src={currentSong?.song_image[0]}
                          alt=""
                          className="w-[100%] rounded-[5px] w-[60px] h-[60px] sm:w-[64px] sm:h-[64px]"
                        />
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="media-content flex justify-center items-start flex-col w-full overflow-hidden">
                  <div className="is-mark level-left">
                    <div className="song-info-wrapper">
                      <span className="song-title-item">
                        <Link to={"#"}>
                          <div className="title-wrapper scrolling-container">
                            <span className="item-title title text-[14px] text-[#fff] hidden md:block">
                              {currentSong?.song_name}
                              {/* {chekcSubString(
                              currentSong?.song_name as string,
                              30
                            )} */}
                            </span>
                            {checkLengthNameSong(
                              currentSong?.song_name as string
                            ) ? (
                              <span className="block md:hidden item-title title text-[14px] text-[#fff] scrolling-text">
                                {currentSong?.song_name}
                              </span>
                            ) : (
                              <span className="block md:hidden item-title title text-[14px] text-[#fff]">
                                {currentSong?.song_name}
                              </span>
                            )}
                          </div>
                        </Link>
                      </span>
                    </div>
                  </div>
                  <h3 className="is-one-line is-truncate subtitle  ">
                    <Link to={"#"}>
                      <div className="title-wrapper">
                        <span className="item-title title text-[13px] font-thin text-[#dadada]">
                          {currentSong?.id_Singer.name}
                        </span>
                      </div>
                    </Link>
                  </h3>
                </div>

                <div className=" items-center justify-start hidden md:w-[25%] md:flex">
                  <div className="flex items-center justify-center mx-[15px] ">
                    <div className="level-item">
                      <button
                        className="bg"
                        onClick={() =>
                          onhandleFavourite(
                            dispatch,
                            currentSong?._id as string,
                            token as string
                          )
                        }
                      >
                        <ActiveFavourites item={currentSong as ifSong} />
                      </button>
                    </div>
                    <div className="level-item ml-3">
                      <span id="np_menu">
                        <button className="zm-btn zm-tooltip-btn btn-more is-hover-circle button ">
                          <BsThreeDots />
                        </button>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-[45%] h-[100%] fjc hidden md:block">
            <div className=" h-[100%] ">
              <div className="w-[100%] h-[70%] fjc">
                <div className="w-[40%] min-w-[200px] h-[75%] flex">
                  <div className="w-[19%] h-[100%] ">
                    <ListItemButtonStyle onClick={handRandomSong}>
                      <ListItemIconStyle>
                        <ShuffleIcon
                          sx={{ color: randomSong ? "#3BC8E7" : "white" }}
                        />
                      </ListItemIconStyle>
                    </ListItemButtonStyle>
                  </div>
                  <PrevSong ListData={props.ListData} />
                  <div className="w-[24%] h-[100%] ">
                    <PauseListItemButtonStyle onClick={togglePlayPause}>
                      <PauseListItemIconStyle>
                        {stateSong ? (
                          <PauseIcon className={classes.root} />
                        ) : (
                          <PlayArrowIcon className={classes.root} />
                        )}
                      </PauseListItemIconStyle>
                    </PauseListItemButtonStyle>
                  </div>
                  <NextSong ListData={props.ListData} />
                  <div className="w-[19%] h-[100%] ">
                    <ListItemButtonStyle
                      onClick={() => setRepeat((value) => !value)}
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
                <audio
                  ref={audioRef}
                  src={currentSong ? (currentSong.song_link as string) : ""}
                  preload={"metadata"}
                />
                <div className="w-full h-[20px] flex justify-between">
                  <div className="w-[6%] h-full fjc">
                    <p>{currentTime}</p>
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
                      onChange={handRewindAudio}
                    />
                  </div>
                  <div className="w-[6%] h-full fjc">
                    {audioRef.current
                      ? SeconToMinuste(audioRef.current?.duration)
                      : 0}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Màn hình đt ẩn */}
          <div className="w-[25%] h-[100%] items-center justify-between hidden md:flex">
            <div className="w-[80%] h-[40px]  flex justify-end items-center  ">
              <div className="w-[50%] h-[100%] flex ">
                <div className="w-[30%] h-[100%]">
                  <ListItemButtonStyle
                    onClick={() => handTurnVolume(volume, setVolume)}
                  >
                    <ListItemIconStyle>
                      {volume <= 0 ? (
                        <VolumeOffIcon sx={{ color: "white" }} />
                      ) : (
                        <VolumeUpIcon sx={{ color: "white" }} />
                      )}
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
            <div className="w-[20%] h-[40px] fjc">
              <ListItemButtonStyle
                sx={{
                  "& .MuiTouchRipple-root": {
                    display: "none",
                  },
                }}
                onClick={() => {
                  props.setSideBarRight((value) => !value);
                }}
              >
                <ListItemIconStyle
                  sx={{
                    backgroundColor: "#3BC8E7",
                    borderRadius: "5px",
                    ":hover": {
                      backgroundColor: "#3BC8E7a3",
                    },
                  }}
                >
                  <LibraryMusicIcon sx={{ color: "white" }} />
                </ListItemIconStyle>
              </ListItemButtonStyle>
            </div>
          </div>

          {/* màn hình điện thoại thì hiện */}
          <div className="flex md:hidden">
            <button
              className="bg"
              onClick={() =>
                onhandleFavourite(
                  dispatch,
                  currentSong?._id as string,
                  token as string
                )
              }
            >
              <ActiveFavourites item={currentSong as ifSong} />
            </button>

            <div className="w-[45px]">
              <PauseListItemButtonStyle onClick={togglePlayPause}>
                <PauseListItemIconStyle>
                  {stateSong ? (
                    <PauseIcon className={classes.root} />
                  ) : (
                    <PlayArrowIcon className={classes.root} />
                  )}
                </PauseListItemIconStyle>
              </PauseListItemButtonStyle>
            </div>

            <NextSong ListData={props.ListData} />
          </div>
        </div>
      </div>
      <div className="block md:hidden absolute bottom-[130px] right-[10px] z-20">
        <ListItemButtonStyle
          sx={{
            "& .MuiTouchRipple-root": {
              display: "none",
            },
          }}
          onClick={() => {
            props.setSideBarRight((value) => !value);
          }}
        >
          <ListItemIconStyle
            sx={{
              backgroundColor: "#3BC8E7",
              borderRadius: "5px",
              ":hover": {
                backgroundColor: "#3BC8E7a3",
              },
            }}
          >
            <LibraryMusicIcon sx={{ color: "white" }} />
          </ListItemIconStyle>
        </ListItemButtonStyle>
      </div>
    </>
  );
};

export default Footer;
