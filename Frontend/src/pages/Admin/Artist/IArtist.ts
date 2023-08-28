import * as Yup from "yup"

export interface IArtist {
    _id?: string,
    name: string,
    age: number,
    images: File | string[] | null,
    description: string,
    album: string,
    songs: string
}

export const formArtist = Yup.object({
    name: Yup.string().required("Enter the name"),
    age: Yup.number().required("Enter the age"),
    images: Yup.string().required("Enter the email"),
    description: Yup.string().required("Enter the description"),
    album: Yup.string().required("Select at least 1 album"),
    songs: Yup.string().required("Select at least 1 song")
})

export type formArtist = Yup.InferType<typeof formArtist>