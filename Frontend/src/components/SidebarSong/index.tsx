import {
  ListItemButtonStyle,
  ListItemIconStyle,
  PauseListItemButtonStyle,
  PauseListItemIconStyle,
  ListItemIconBgStyle,
} from "@/Mui/style/Footer/StyleAction";
import React, { useEffect, useState } from "react";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useStyles } from "../Footer";
import { handGetSong } from "@/store/Reducer/Song";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { ifSong } from "@/pages/Admin/Interface/ValidateSong";
import {
  ActiveFavourites,
  onhandleFavourite,
} from "@/constane/favourites.const";
import { activeSong, chekcSubString } from "@/constane/song.const";
import { setDataLocal } from "@/store/Reducer/currentSong";
import { RootState } from "@/store/store";
import ModalSongMenu from "../Modals/modalSongMenu";

type Props = {
  sideBarRight: boolean;
};

const SidebarSong = (props: Props) => {
  const [stateColor, setStateColor] = React.useState<boolean>(true);
  const { stateSong, dataLocal, currentSong } = useAppSelector(
    ({ currentSong }) => currentSong
  );
  const { token } = useAppSelector((state: RootState) => state.user);

  const dispatch = useAppDispatch();
  const { song } = useAppSelector(({ Song }) => Song);
  const classes = useStyles();
  useEffect(() => {
    dispatch(handGetSong());
  }, []);

  useEffect(() => {
    const getSongLocal = localStorage?.getItem("song") || "";
    if (getSongLocal) {
      const currentlocal: ifSong = JSON?.parse(getSongLocal);
      dispatch(setDataLocal(currentlocal));
    }
  }, [stateSong, song.length, currentSong]);

  const handTogglePlaylist = () => {
    const preStateColor = stateColor;
    setStateColor(!preStateColor);
    if (!preStateColor) {
      setStateColor(true);
    } else {
      setStateColor(false);
    }
  };
  const [modal, setModal] = useState<boolean>(false);
  const [songItem, setSongItem] = useState<any>();

  const handleShowModalCreateRoom = () => {
    setModal(!modal);
  };

  const handleAction = (item: any) => {
    setModal(true);
    setSongItem(item);
  };

  return (
    <>
      {/* sidebar màn hình máy tính */}
      <div
        className={`right-0 transition-all duration-700 hidden md:block ${
          props.sideBarRight
            ? "w-[500px] px-[8px]"
            : "fixed translate-x-[400px] w-0"
        } sticky z-10  border-l-[1px] border-[#120822] text-white h-[calc(100vh-90px)] bg-[#14182A] bottom-[90px] fjc `}
      >
        <div className="w-full h-full">
          <div className="w-full h-[70px] fjc">
            <div className="w-full h-[50%] px-[8px] flex">
              <div className="w-[70%] h-full bg-[#2A2139] rounded-full flex items-center justify-center">
                <div className="w-[48%] h-[85%]">
                  <button
                    className={`text-[11px] transition-all  w-full rounded-full h-full ${
                      stateColor ? "bg-[#6A6474] font-bold" : ""
                    }`}
                    onClick={() => handTogglePlaylist()}
                  >
                    Danh sách phát
                  </button>
                </div>
                <div className="w-[50%] h-[85%]">
                  <button
                    className={`text-[10px] transition-all w-full h-full rounded-full ${
                      stateColor ? "" : "bg-[#6A6474] font-bold"
                    }`}
                    onClick={() => handTogglePlaylist()}
                  >
                    Nghe gần đây
                  </button>
                </div>
              </div>
              <div className="w-[30%] h-full flex">
                <div className="w-[50%] h-full">
                  <ListItemButtonStyle>
                    <ListItemIconBgStyle>
                      <AccessAlarmIcon
                        sx={{ color: "white", fontSize: "18px" }}
                      />
                    </ListItemIconBgStyle>
                  </ListItemButtonStyle>
                </div>
                <div className="w-[50%] h-full">
                  <ListItemButtonStyle>
                    <ListItemIconBgStyle>
                      <MoreHorizIcon
                        sx={{ color: "white", fontSize: "18px" }}
                      />
                    </ListItemIconBgStyle>
                  </ListItemButtonStyle>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full fjc">
            <div className="w-full h-[90%] ">
              <div className="w-full h-[50%] flex items-center justify-start ">
                <h2 className="font-bold text-[14px]">Tiếp Theo</h2>
              </div>
              <div className="w-full h-[50%]  flex justify-start items-center">
                <h3 className="text-[14px] text-[rgba(254,255,255,0.6)] flex">
                  Từ playlist
                  <span className="text-[#3BC8E7] pl-[5px]">Mới phát hành</span>
                </h3>
              </div>
            </div>
          </div>
          {modal && (
            <>
              <ModalSongMenu
                song={songItem}
                onShowModal={handleShowModalCreateRoom}
              />
            </>
          )}
          <div className="w-full relative fjc h-[calc(100vh-200px)] overflow-y-auto">
            <div className="w-full h-[100%] overflow-y-scroll">
              {song &&
                song?.length > 0 &&
                song.map((item: ifSong, index: number) => {
                  return (
                    <div
                      key={index}
                      className={`w-full h-[60px] ${
                        dataLocal && dataLocal?._id == item._id
                          ? "bg-[#092635]"
                          : "hover:bg-[#b4b4b32d]"
                      } my-1 fjc  cursor-pointer rounded-lg wall`}
                    >
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
                                    ? activeSong(dispatch, item, "stopPause")
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
                            <h1 className="font-semibold">
                              {chekcSubString(item.song_name as string, 13)}
                            </h1>
                          </div>
                          <div className="w-full h-[50%]">
                            <p className="text-gray-500 text-[12px]">
                              {item.id_Singer?.name}
                            </p>
                          </div>
                        </div>
                        <div className="w-[30%] h-full flex">
                          <div className="w-1/2">
                            <ListItemButtonStyle
                              onClick={() =>
                                onhandleFavourite(
                                  dispatch,
                                  item?._id as string,
                                  token as string
                                )
                              }
                            >
                              <ListItemIconStyle>
                                <ActiveFavourites item={item} />
                              </ListItemIconStyle>
                            </ListItemButtonStyle>
                          </div>
                          <div
                            className="w-1/2"
                            onClick={() => handleAction(item)}
                          >
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
                  );
                })}
            </div>
          </div>
        </div>
      </div>

      {/* sidebar màn hình điện thoại */}
      <div
        className={`right-0 transition-all duration-700 block md:hidden ${
          props.sideBarRight
            ? "absolute w-full"
            : "fixed translate-x-[400px] w-0"
        }  z-10  border-l-[1px] border-[#120822] text-white h-[calc(100vh-130px)] bg-[#14182A] top-[70px] overflow-y-auto fjc `}
      >
        <div className="w-full h-full">
          <div className="w-full h-[70px] fjc">
            <div className="w-full h-[50%] px-[8px] flex">
              <div className="w-[70%] h-full bg-[#2A2139] rounded-full flex items-center justify-center">
                <div className="w-[48%] h-[85%]">
                  <button
                    className={`text-[11px] transition-all  w-full rounded-full h-full ${
                      stateColor ? "bg-[#6A6474] font-bold" : ""
                    }`}
                    onClick={() => handTogglePlaylist()}
                  >
                    Danh sách phát
                  </button>
                </div>
                <div className="w-[50%] h-[85%]">
                  <button
                    className={`text-[10px] transition-all w-full h-full rounded-full ${
                      stateColor ? "" : "bg-[#6A6474] font-bold"
                    }`}
                    onClick={() => handTogglePlaylist()}
                  >
                    Nghe gần đây
                  </button>
                </div>
              </div>
              <div className="w-[30%] h-full flex">
                <div className="w-[50%] h-full">
                  <ListItemButtonStyle>
                    <ListItemIconBgStyle>
                      <AccessAlarmIcon
                        sx={{ color: "white", fontSize: "18px" }}
                      />
                    </ListItemIconBgStyle>
                  </ListItemButtonStyle>
                </div>
                <div className="w-[50%] h-full">
                  <ListItemButtonStyle>
                    <ListItemIconBgStyle>
                      <MoreHorizIcon
                        sx={{ color: "white", fontSize: "18px" }}
                      />
                    </ListItemIconBgStyle>
                  </ListItemButtonStyle>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full fjc">
            <div className="w-full h-[90%] px-[12px] pb-[20px]">
              <div className="w-full h-[50%] flex items-center justify-start ">
                <h2 className="font-bold text-[14px]">Tiếp Theo</h2>
              </div>
              <div className="w-full h-[50%]  flex justify-start items-center">
                <h3 className="text-[14px] text-[rgba(254,255,255,0.6)] flex">
                  Từ playlist
                  <span className="text-[#3BC8E7] pl-[5px]">Mới phát hành</span>
                </h3>
              </div>
            </div>
          </div>
          {modal && (
            <>
              <ModalSongMenu
                song={songItem}
                onShowModal={handleShowModalCreateRoom}
              />
            </>
          )}
          <div className="w-full relative fjc h-[calc(100vh-318px)] overflow-y-auto">
            <div className="w-full h-[100%] overflow-y-scroll">
              {song &&
                song?.length > 0 &&
                song.map((item: ifSong, index: number) => {
                  return (
                    <div
                      key={index}
                      className={`w-full h-[60px] ${
                        dataLocal && dataLocal?._id == item._id
                          ? "bg-[#092635]"
                          : "hover:bg-[#b4b4b32d]"
                      } my-3 fjc  cursor-pointer rounded-lg wall`}
                    >
                      <div className="w-[95%] h-[80%] flex justify-between ">
                        <div className="w-[17%] h-full">
                          <div className="w-full h-full flex justify-start items-center relative wallSong">
                            <img
                              className="w-[60px] h-[60px] bg-cover rounded-[5px]"
                              src={`${item.song_image[0]}`}
                            />
                            <div className="absolute w-[47px] h-[45px] top-[0] left-[-5px] z-10 fjc pause">
                              <PauseListItemButtonStyle
                                onClick={() =>
                                  stateSong && dataLocal?._id == item._id
                                    ? activeSong(dispatch, item, "stopPause")
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
                            <h1 className="font-semibold">
                              {chekcSubString(item.song_name as string, 13)}
                            </h1>
                          </div>
                          <div className="w-full h-[50%]">
                            <p className="text-gray-500 text-[12px]">
                              {item.id_Singer?.name}
                            </p>
                          </div>
                        </div>
                        <div className="w-[30%] h-full flex">
                          <div className="w-1/2">
                            <ListItemButtonStyle
                              onClick={() =>
                                onhandleFavourite(
                                  dispatch,
                                  item?._id as string,
                                  token as string
                                )
                              }
                            >
                              <ListItemIconStyle>
                                <ActiveFavourites item={item} />
                              </ListItemIconStyle>
                            </ListItemButtonStyle>
                          </div>
                          <div
                            className="w-1/2"
                            onClick={() => handleAction(item)}
                          >
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
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarSong;
