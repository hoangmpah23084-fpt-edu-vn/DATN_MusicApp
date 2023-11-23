import { ifSong } from "./ValidateSong";

export interface IGenre {
    _id: string,
    name: string,
    list_songs: ifSong[];
}