


import { ListItemButtonStyle, ListItemIconStyle, PauseListItemButtonStyle, PauseListItemIconStyle } from '@/Mui/style/Footer/StyleAction'
import { ActiveFavourites, onhandleFavourite } from '@/constane/favourites.const'
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { activeSong, chekcSubString } from '@/constane/song.const';
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { ifSong } from '@/pages/Admin/Interface/ValidateSong';
import { useStyles } from '../Footer';
import ModalSongMenu from '../Modals/modalSongMenu';
import { useState } from 'react';
type Props = {
    item: ifSong
}

const ItemSongSidebar = ({ item }: Props) => {
    const { stateSong, dataLocal } = useAppSelector(({ currentSong }) => currentSong);
    const [modal, setModal] = useState<boolean>(false);
    const token = localStorage.getItem('token')
    const classes = useStyles();
    const dispatch = useAppDispatch()
    const handleShowModalCreateRoom = () => {
        setModal(!modal)
    }
    return (
        <div
            key={item._id}
            className={`w-full h-[60px] ${dataLocal && dataLocal?._id == item._id
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
                        <h1 className="font-semibold">{chekcSubString(item.song_name as string, 13)}</h1>
                    </div>
                    <div className="w-full h-[50%]">
                        <p className="text-gray-500 text-[12px]">
                            {item.id_Singer?.name}
                        </p>
                    </div>
                </div>
                <div className="w-[30%] h-full flex">
                    <div className="w-1/2">
                        <ListItemButtonStyle onClick={() => onhandleFavourite(dispatch, item?._id as string, token as string)}  >
                            <ListItemIconStyle>
                                <ActiveFavourites item={item} />
                            </ListItemIconStyle>
                        </ListItemButtonStyle >
                    </div>
                    <div className="w-1/2 relative" onClick={() => setModal(!modal)}>
                        <ListItemButtonStyle>
                            <ListItemIconStyle>
                                <MoreHorizIcon
                                    sx={{ color: "white", fontSize: "20px" }}
                                />
                            </ListItemIconStyle>
                        </ListItemButtonStyle>
                    </div>

                    {modal && (
                        <>
                            <ModalSongMenu song={item} onShowModal={handleShowModalCreateRoom} />
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ItemSongSidebar