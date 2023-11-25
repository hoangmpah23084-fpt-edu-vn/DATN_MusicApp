import { ActiveFavourites } from '@/constane/favourites.const';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import {
    ListItemButtonStyle,
    ListItemIconStyle,
    PauseListItemButtonStyle,
    PauseListItemIconStyle,
    ListItemIconBgStyle,
  } from "@/Mui/style/Footer/StyleAction";
import { useStyles } from '@/components/Footer';
import { activeSong, chekcSubString } from '@/constane/song.const';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import axios from 'axios';
import { ifSong } from '@/pages/Admin/Interface/ValidateSong';

type Props = {}
const ListSongInRoom = (props: Props) => {
    const [listSong, setListSong] = useState<ifSong[] | []>([]);
    const {id} = useParams();
    const classes = useStyles();
    const dispatch = useAppDispatch();
    const { stateSong, dataLocal } = useAppSelector(({ currentSong }) => currentSong);
    useEffect(() => {
        if (id) {
        axios.get(`http://localhost:8080/api/room/${id}`).then(({data}) => setListSong(data.data.listSong))
        }
    })
  return (
    <div className='w-full h-full overflow-y-scroll bg-[#130C1C] rounded-md p-2'>
        {
           listSong.length > 0 && listSong.map((item, index) => {
            return <div className='w-full flex' key={index}>
            <div className={`w-full h-[60px] flex justify-center rounded-md items-center ${
              dataLocal?._id == item._id ? 'bg-[#9B4DE0]' : 'hover:bg-[#b4b4b32d]'
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
                              onClick={() =>
                                stateSong && dataLocal?._id == item._id
                                  ? activeSong(dispatch, item, 'stopPause')
                                  : activeSong(dispatch, item, "start")
                              }
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
                                {dataLocal &&
                                  stateSong &&
                                  dataLocal?._id == item._id ? (
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
                          <h1 className="font-semibold font-sans">{chekcSubString(item.song_name as string)}</h1>
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
                          <ListItemButtonStyle>
                            <ListItemIconStyle>
                              <MoreHorizIcon
                                sx={{ color: "white", fontSize: "20px" }}
                              />
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

// ${dataLocal && dataLocal?._id == item._id
//     ? "bg-[#9B4DE0]"
//     : "hover:bg-[#b4b4b32d]"