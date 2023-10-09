import React, { useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { Link } from "react-router-dom";
import ShuffleIcon from '@mui/icons-material/Shuffle';
import { ListItemButtonStyle, ListItemIconStyle, PauseListItemButtonStyle, PauseListItemIconStyle } from "@/Mui/style/Footer/StyleAction";
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import RepeatIcon from '@mui/icons-material/Repeat';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { makeStyles, createStyles } from "@material-ui/core/styles"; 
import { Slider } from "@mui/material";
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';

const useStyles = makeStyles(() => createStyles({
  root: {
    color : "white",
    "&:hover" :{color : "#9B4DE0"}
  },
}));
const Footer = () => {
  const [pause, setpause] = React.useState(false);
  const [duration, setDuration] = React.useState<number>(0);
  const [currentTime , setCurrentTime] = React.useState('');
  const [rewindAudio , setRewindAudio] = React.useState<number>(0);
  const [volume , setVolume] = React.useState<number>(50);
  const [turnVolume, setTurnVolume] = useState(false);
  const [repeat , setRepeat] = React.useState(false);
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const rewindRef = React.useRef<HTMLAudioElement>(null);
  const classes = useStyles();
  const [intervalId, setIntervalId] = React.useState<number | null>(null);

  const handPause = React.useCallback(() => {
    setpause((pause) => !pause);
    const id = setInterval(() => {
      audioRef.current && setRewindAudio(audioRef.current?.currentTime);
      audioRef.current && setCurrentTime(SeconToMinuste(Number(audioRef.current.currentTime)));
    }, 1000);
    setIntervalId(id);
  }, []);
  const handChangeVolume = (event: any, value: any) => {
    setVolume(value as number);

  }

  const handTurnVolume = () => {
    setTurnVolume((item) => !item);
    if (turnVolume == false) {
      setVolume(0)
    }else{
      setVolume(50)
    }
  }

  const stopPause = React.useCallback(() => {
    setpause((pause) => !pause);
    if (intervalId !== null) {
      clearInterval(intervalId);
      setIntervalId(null); // Đặt lại intervalId về null khi dừng
    }
  }, [intervalId]);
  function SeconToMinuste(giay : number) {
    const currentSecon= Number(giay.toFixed(0));
    let minute = Math.floor(currentSecon / 60);
    const Secon = currentSecon % 60;
    minute = minute % 60;
    const minusteString = minute.toString().padStart(2,'0');
    const SeconString = Secon.toString().padStart(2, '0');
    return minusteString + ':' + SeconString;
  }
  const handRewindAudio = (event: any, value: any) => {
    rewindRef.current && rewindRef.current.addEventListener("mouseup", () => {
      if (audioRef.current) {
        audioRef.current.currentTime = Number(value)
        setRewindAudio(value as number);
        setCurrentTime(SeconToMinuste(Number(audioRef.current.currentTime)));
      }
    })
    audioRef.current && setCurrentTime(SeconToMinuste(Number(audioRef.current.currentTime)));
    setRewindAudio(value as number);
  }
  React.useEffect(() => {
    pause ? audioRef.current?.play() : audioRef.current?.pause();
    setDuration(audioRef.current?.duration as number);
    audioRef.current && (audioRef.current.loop = repeat);
    audioRef.current && (audioRef.current.volume = (volume / 100));
    setTimeout(() => {
      if (audioRef.current !== null) {
        setCurrentTime(SeconToMinuste(Number(audioRef.current.currentTime)));
        setRewindAudio(audioRef.current.currentTime);
      }
    });
  },[pause, repeat, volume])
  
  return (
    <div className="fixed z-10 w-[100%] bottom-0 bg-[#170f23]">
      <div className="level text-white h-[90px] px-[20px] bg-[#130c1c]  border-t-[1px] border-[#32323d] flex">
        <div className="flex items-center justify-start w-[20%] h-[100%]">
          <div className="flex items-center w-[100%]">
            <div className="flex w-[100%] ">
              <div className="">  
                <Link to={"#"}>
                  <div className="thumbnail-wrapper">
                    <div className="thumbnail w-[64px] h-[64px] mr-[10px]">
                      <img
                        src="https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/5/c/f/3/5cf36d55b9dce546b250d73db6239d5f.jpg"
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
                            Chỉ Vì Quá Hy Vọng
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
                        Hoài Lâm
                      </span> 
                    </div>
                  </Link>
                </h3>
              </div>
              <div className="flex items-center justify-center w-[40%]">
                <div className="flex items-center justify-center ml-[20px] ">
                  <div className="level-item">
                    <button className="bg">
                      <AiOutlineHeart />
                    </button>
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
        {/* <button onClick={startCounter}>Bấm để tăng</button>
              <button onClick={stopCounter}>Dừng</button> */}
          <div className="w-[65%] h-[100%] ">
            <div className="w-[100%] h-[70%] fjc">
              <div className="w-[40%] min-w-[200px] h-[75%] flex">
                <div className="w-[19%] h-[100%] ">
                  <ListItemButtonStyle >
                    <ListItemIconStyle>
                      <ShuffleIcon sx={{ color : "white"}} />
                    </ListItemIconStyle>
                  </ListItemButtonStyle>
                </div>
                <div className="w-[19%] h-[100%] ">
                  <ListItemButtonStyle >
                    <ListItemIconStyle>
                      <SkipPreviousIcon sx={{ color : "white"}} />
                    </ListItemIconStyle>
                  </ListItemButtonStyle>
                </div>

                <div className="w-[24%] h-[100%] ">
                  <PauseListItemButtonStyle onClick={() => pause ?  stopPause() : handPause()} >
                    <PauseListItemIconStyle>
                      {pause ?  <PauseIcon className={classes.root} /> : <PlayArrowIcon className={classes.root} />}
                    </PauseListItemIconStyle>
                  </PauseListItemButtonStyle>
                </div>
                <div className="w-[19%] h-[100%] ">
                  <ListItemButtonStyle >
                    <ListItemIconStyle>
                      <SkipNextIcon sx={{ color : "white"}} />
                    </ListItemIconStyle>
                  </ListItemButtonStyle>
                </div>
                <div className="w-[19%] h-[100%] ">
                  <ListItemButtonStyle onClick={() => setRepeat((value) => !value)} >
                    <ListItemIconStyle>
                      <RepeatIcon sx={{ color : repeat ? "#c273ed" : "white"}} />
                    </ListItemIconStyle>
                  </ListItemButtonStyle>
                </div>
              </div>
            </div>
            <div className="w-[100%] h-[30%] flex justify-center items-start">
              <audio ref={audioRef} src="https://res.cloudinary.com/dsbiugddk/video/upload/v1695049634/audiofiles/hwns7m56wj6tzs0necjz.mp3" preload={"metadata"} />
              <div className="w-full h-[20px] flex justify-between">
                <div className="w-[6%] h-full fjc" >
                  <p>{currentTime}</p>
                </div>
                <div className="w-[85%] h-full fjc">
                  <Slider sx={{color : "white" ,"& .MuiSlider-thumb" : {
                    width : "0px",
                    height : "0px",
                    // transition: '0.1s cubic-bezier(.47,1.64,.41,.8)',
                    "&:focus":{
                      backgroundColor : "red"
                    },
                    "&:hover" : {
                      width : "12px",
                      height : "12px",
                    },
                    '&:hover, &.Mui-focusVisible': {
                      width : "12px",
                      height : "12px",
                      boxShadow: '0px 0px 0px 8px rgb(255 255 255 / 16%)'
                    },
                  },
                  // min={0} step={1}
                   }} value={rewindAudio} max={duration} ref={rewindRef} onChange={handRewindAudio}  />
                </div>
                <div className="w-[6%] h-full fjc">
                {audioRef.current ? SeconToMinuste(audioRef.current?.duration) : "--:--" }
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[20%] h-[100%] flex items-center justify-between ">
          <div className="w-[80%] h-[40px]  flex justify-end items-center  ">
            <div className="w-[50%] h-[100%] flex ">
              <div className="w-[30%] h-[100%]">
              <ListItemButtonStyle onClick={() => handTurnVolume()} >
                    <ListItemIconStyle> 
                    {turnVolume ? <VolumeOffIcon sx={{ color : repeat ? "#c273ed" : "white"}} /> :  <VolumeUpIcon sx={{ color : repeat ? "#c273ed" : "white"}} />}
                    </ListItemIconStyle>
                  </ListItemButtonStyle>
              </div>
              <div className="w-[65%] h-[100%] fjc ">
                <Slider sx={{color : "white" ,"& .MuiSlider-thumb" : {
                    width : "0px",
                    height : "0px",
                    transition: '0.1s cubic-bezier(.47,1.64,.41,.8)',
                    "&:hover" : {
                      width : "12px",
                      height : "12px",
                    },
                    '&:hover, &.Mui-focusVisible': {
                      width : "12px",
                      height : "12px",
                      boxShadow: '0px 0px 0px 8px rgb(255 255 255 / 16%)'
                    },
                  },
                   }} value={volume} onChange={handChangeVolume}/>
              </div>
            </div>
          </div>
          <div className="w-[1px] h-[35px] bg-[#dadada6c]"></div>
          <div className="w-[20%] h-[40px] fjc" >
                  <ListItemButtonStyle  onClick={() => setRepeat((value) => !value)} >
                    <ListItemIconStyle sx={{ backgroundColor : "#9B4DE0", borderRadius : "5px", ":hover": {
                      backgroundColor : "#9b4de0a3"
                    } }} >
                      <LibraryMusicIcon sx={{ color : repeat ? "#c273ed" : "white"}} />
                    </ListItemIconStyle>
                  </ListItemButtonStyle>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
