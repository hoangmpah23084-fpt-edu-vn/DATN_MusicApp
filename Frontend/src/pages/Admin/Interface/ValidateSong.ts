import * as yup from "yup";

export const SongSchame = yup.object().shape({
    song_name: yup.string().required('Song name is required.'),
    song_link: yup.mixed().notRequired(),
    song_image: yup.mixed().notRequired(),
    song_singer: yup.string().required('Singer is required.'),
    song_lyric: yup.string().required('Lyrics are required.'),
    song_title: yup.string().required('Lyrics are required.'),
    id_Genre: yup.string().required('Genre is required.'),
    id_Artists: yup.string().required('Artist is required.'),
})

export interface ifSong {
    _id?: string;
    song_name: string;
    song_title: string;
    song_link: string[] | string | undefined;
    song_image: string[] ;
    song_singer: string;
    song_musian: string;
    song_lyric: string
    id_Genre: string; // Make it required
    id_Artists: string; // Make it required
  }
  export interface ifSongAdmin {
    _id?: string;
    song_name: string;
    song_link: string[] | string | undefined;
    song_image: string[] | undefined ;
    song_singer: string;
    song_lyric: string
    id_Genre: string; // Make it required
    id_Artists: string; // Make it required
  }
  export interface ifCurrentSong {
    _id?: string;
    song_name: string;
    song_link: string ;
    song_image: string[] | undefined ;
    song_singer: string;
    song_lyric: string
    id_Genre: string; // Make it required
    id_Artists: string; // Make it required
  }
  export type TypeSong = {
    _id?: string;
    song_name: string;
    song_title: string;
    song_link: string[] | string | undefined;
    song_image: string[] | undefined;
    song_singer: string;
    song_musian: string;
    song_lyric: string;
    id_Genre: string; // Make it required
    id_Artists: string; // Make it required
  }