import * as yup from "yup";
interface FileWithType extends File {
    type: string;
  }

export const SongSchame = yup.object().shape({
    song_name: yup.string().required("Please enter song_name"),
    song_title: yup.string().required("Please enter song_title"),
    song_singer: yup.string().required("Please enter song_singer"),
    song_musian: yup.string().required("Please enter song_musian"),
    id_Genre : yup.string(),
    id_Artists : yup.string(),
    song_lyric: yup.string().required("Please enter song_lyric"),
    song_image : yup.mixed<FileWithType>()
    .required('A file is required'),
    song_link : yup.mixed<FileWithType>()
    .required('A file is required'),
})

export interface ifSong {
    _id ?: string,
    song_name: string,
    song_title: string,
    song_link: File | string,
    song_image: File | string[] | null,
    song_singer : string,
    song_musian : string,
    song_lyric: string,
    id_Genre: string,
    id_Artists:string,
}