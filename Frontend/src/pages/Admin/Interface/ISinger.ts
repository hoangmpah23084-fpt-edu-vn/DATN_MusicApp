import * as Yup from "yup"
import { ifSong } from "./ValidateSong"

export interface ISinger {
    _id: string,
    name: string,
    age: number,
    images: string[],
    description: string,
    songs: ifSong[]
}

export const formArtist = Yup.object({
    name: Yup.string().required("Enter the name"),
    age: Yup.number().required("Enter the age"),
    images: Yup.mixed().notRequired(),
    description: Yup.string().required("Enter the description"),
    album: Yup.object({
        _id: Yup.string().notRequired(),
        name: Yup.string().notRequired(),
    }).notRequired(),
    songs: Yup.object({
        _id: Yup.string().notRequired(),
        name: Yup.string().notRequired(),
    }).notRequired()
})

export type formArtist = Yup.InferType<typeof formArtist>

export type IApiSinger = {
    page?: number;
    pageSize?: number;
    search?: string;
    sort?: string;
    order?: string
}