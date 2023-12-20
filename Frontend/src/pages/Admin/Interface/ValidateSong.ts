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
  song_singer: ReactNode;
  _id?: string;
  id?: string;
  song_name: string;
  song_title: string;
  song_link: string;
  song_image: string[];
  view_song?: number,
  total_like?: number,
  id_Genre: {
    _id?: string;
    name: string;
  };
  id_Singer: {
    _id?: string;
    name: string;
  };
  song_lyric?: string
}
export interface ifCurrentSong {
  _id?: string;
  song_name: string;
  song_title: string;
  song_link: string;
  song_image: string[];
  view_song?: number,
  total_like?: number,
  id_Genre: {
    _id?: string;
    name: string;
  };
  id_Singer: {
    _id?: string;
    name: string;
  };
  song_lyric?: string
}
export type TypeSong = {
  _id?: string;
  song_name: string;
  song_title: string;
  song_link: string;
  song_image: string[];
  view_song?: number,
  total_like?: number,
  id_Genre: {
    _id?: string;
    name: string;
  };
  id_Singer: {
    _id?: string;
    name: string;
  };
  song_lyric?: string
}

export type IApiSong = {
  page?: number;
  pageSize?: number;
  search?: string;
  sort?: string;
  order?: string
}

export interface SongLink {
  name: string;
  value: string;
}

export interface itemSong {
  _id: string;
  view_song: string;
  total_like: string;
  song_name: string;
  id_Genre: {
    name: string
  },
  id_Singer: {
    name: string
  },
  createdAt: string
}