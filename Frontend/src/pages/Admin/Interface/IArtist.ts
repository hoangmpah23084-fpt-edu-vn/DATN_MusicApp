import * as yup from "yup"

export interface IArtist {
    _id: string,
    name: string,
    age: number,
    images: string[] | undefined,
    description: string,
    album: string[] | undefined,
    songs: string[] | undefined,
}

export const validateArtist = yup.object({
    name: yup.string().required("Enter the name"),
    age: yup.number().required("Enter the age"),
    images: yup.mixed().notRequired(),
    description: yup.string().required("Enter the description"),
    album: yup.string(),
    songs: yup.string()
})