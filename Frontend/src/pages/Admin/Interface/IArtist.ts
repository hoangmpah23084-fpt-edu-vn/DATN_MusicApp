import * as Yup from "yup"

export interface IArtist {
    _id: string,
    name: string,
    age: number,
    images: string[] | undefined,
    description: string,
    album: string,
    songs: string[]
}
export type TypeArtist = {
    _id?: string,
    name: string,
    age: number,
    images: string[] | undefined,
    description: string,
    album: string,
    songs: string[]
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