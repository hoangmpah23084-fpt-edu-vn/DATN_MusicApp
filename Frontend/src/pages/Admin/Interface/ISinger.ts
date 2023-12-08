import * as Yup from "yup"
import { ifSong } from "./ValidateSong"

export interface ISinger {
    _id: string,
    name: string,
    age: number,
    images: string[],
    description: string,
    album: string,
    songs: ifSong[]
}


export const formArtist = Yup.object({
    name: Yup.string().required("Enter the name"),
    age: Yup.number().required("Enter the age"),
    images: Yup.mixed().notRequired(),
    description: Yup.string().required("Enter the description"),
    album: Yup.string().required("Select at least 1 album"),
    // songs: Yup.string().required("Select at least 1 song")
})

export type formArtist = Yup.InferType<typeof formArtist>