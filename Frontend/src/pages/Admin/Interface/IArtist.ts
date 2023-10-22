import * as yup from "yup"

export interface IArtist {
    _id: string,
    name: string,
    age: number,
    images: string[] | undefined,
    description: string,
    album: string,
    songs: string[]
}

export const validateArtist = yup.object({
    name: yup.string().required("Enter the name"),
    age: yup.number().required("Enter the age"),
    images: yup.mixed().notRequired(),
    description: yup.string().required("Enter the description"),
    album: yup.string().required("Select at least 1 album"),
    // songs: yup.string().required("Select at least 1 song")
})