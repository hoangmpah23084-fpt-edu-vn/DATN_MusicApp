import { ifSong } from "./ValidateSong";
import * as yup from "yup";

export const validateGenre = yup.object().shape({
    name: yup.string().min(6).required("Please enter name genre")
})

export const validateAlbum = yup.object().shape({
    album_name: yup.string().required("Please enter the album name")
})
export interface ifAlbum {
    _id?: string,
    album_name: string,
    list_song?: ifSong[],
}
export interface ifGenre {
    _id?: string,
    name: string,
    list_songs?: ifSong[],
}
export interface ifAddGenre {
    name: string,
}