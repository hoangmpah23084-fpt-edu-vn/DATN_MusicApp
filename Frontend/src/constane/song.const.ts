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

export const chekcSubString = (text: string, length: number) => {
    if (text) {
        let newText = text.substring(0, length);
        if (text.length > length) {
            newText = newText + "...";
        }
        return newText;
    }
    return "";
}




