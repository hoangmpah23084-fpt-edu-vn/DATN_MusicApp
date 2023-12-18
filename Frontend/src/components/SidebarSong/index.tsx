import {
  ListItemButtonStyle,
  ListItemIconBgStyle,
} from "@/Mui/style/Footer/StyleAction";
import React, { useEffect, useState } from "react";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { handGetSong } from "@/store/Reducer/Song";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { ifSong } from "@/pages/Admin/Interface/ValidateSong";
import { setDataLocal } from "@/store/Reducer/currentSong";
import ItemSongSidebar from "./itemSongSidebar";

type Props = {
  sideBarRight: boolean;
};

const SidebarSong = (props: Props) => {
  const [stateColor, setStateColor] = React.useState<boolean>(true);
  const { stateSong, currentSong } = useAppSelector(({ currentSong }) => currentSong);


  const dispatch = useAppDispatch();
  const { song } = useAppSelector(({ Song }) => Song);
  useEffect(() => {
    dispatch(handGetSong());
  }, []);

  useEffect(() => {
    const getSongLocal = localStorage?.getItem("song") || "";
    if (getSongLocal) {
      const currentlocal: ifSong = JSON?.parse(getSongLocal);
      dispatch(setDataLocal(currentlocal))
    }
  }, [stateSong, song.length, currentSong]);

  const [historySongState, setHistorySongState] = useState<ifSong[]>()
  const historySong = localStorage.getItem('history')

  useEffect(() => {

    if (historySong) {
      const parsedHistory = JSON.parse(historySong) as ifSong[];
      if (parsedHistory) {
        const newData = parsedHistory.map((item: any) => (JSON.parse(item)))
        setHistorySongState(newData)
      }
    }
  }, [historySong]);

  const handTogglePlaylist = () => {
    const preStateColor = stateColor;
    setStateColor(!preStateColor);

    if (!preStateColor) {
      setStateColor(true);

    } else {
      setStateColor(false);

    }
  };


  return (
    <div
      className={` right-0 transition-all duration-700 ${props.sideBarRight ? "w-[500px] px-[8px]" : " fixed translate-x-[400px] w-0"
        } sticky z-10  border-l-[1px] border-[#120822] text-white h-[calc(100vh-90px)] bg-[#14182A] bottom-[90px] fjc `}
    >
      <div className="w-full h-full">
        <div className="w-full h-[70px] fjc">
          <div className="w-full h-[50%] px-[8px] flex">
            <div className="w-[70%] h-full bg-[#2A2139] rounded-full flex items-center justify-center">
              <div className="w-[48%] h-[85%]">
                <button
                  className={`text-[11px] transition-all  w-full rounded-full h-full ${stateColor ? "bg-[#6A6474] font-bold" : ""
                    }`}
                  onClick={() => handTogglePlaylist()}
                >
                  Danh sách phát
                </button>
              </div>
              <div className="w-[50%] h-[85%]">
                <button
                  className={`text-[10px] transition-all w-full h-full rounded-full ${stateColor ? "" : "bg-[#6A6474] font-bold"
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
                    <MoreHorizIcon sx={{ color: "white", fontSize: "18px" }} />
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
        <div className="w-full relative fjc h-[calc(100vh-200px)] overflow-y-auto">
          <div className="w-full h-[100%] overflow-y-scroll">
            {stateColor ? song &&
              song?.length > 0 &&
              song.map((item: ifSong) => {
                return (
                  <ItemSongSidebar item={item} />
                )
              }) : historySongState &&
              historySongState?.length > 0 &&
            historySongState.map((item: ifSong) => {
              return (
                <ItemSongSidebar item={item} />
              );
            })}
          </div>
        </div>
      </div>
    </div >
  );
};

export default SidebarSong;
