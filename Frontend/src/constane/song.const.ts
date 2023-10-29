import { ifSong } from "@/pages/Admin/Interface/ValidateSong";
import { handChangeStateSong, handGetCurrentSong, setDataLocal } from "@/store/Reducer/currentSong";
import { AppDispatch } from "@/store/store";

export const activeSong = (
    dispatch: AppDispatch,
    value: ifSong,
    action: 'start' | 'stopPause') => {
    dispatch(handGetCurrentSong(value));
    if (action === "start") {
        dispatch(handChangeStateSong(true));
        localStorage.setItem("song", JSON.stringify(value));
    } else if (action === "stopPause") {
        dispatch(handChangeStateSong(false));
    }

    const getSongLocal = localStorage?.getItem("song") || "";
    if (getSongLocal) {
        const currentlocal: ifSong = JSON?.parse(getSongLocal);
        dispatch(setDataLocal(currentlocal))
    }
};


export const chekcSubString = (text: string) => {
    if (text) {
        let newText = text.substring(0, 10);
        if (text.length > 10) {
            newText = newText + "...";
        }
        return newText;
    }
    return "";
}




