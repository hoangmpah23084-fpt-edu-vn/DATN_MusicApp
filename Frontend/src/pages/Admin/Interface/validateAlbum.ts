import { ifSong } from "./ValidateSong";
import * as yup from "yup";

export const validateGenre= yup.object().shape({
    name : yup.string().min(6).required("Please enter name genre")
})
export interface ifAlbum {
    name : string,
    list_songs ?: ifSong[],
}
export interface ifGenre {
    _id ?: string,
    name : string,
    list_songs ?: ifSong[],
}