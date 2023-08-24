import * as Yup from "yup"

export interface IArtist {
    _id?: string,
    artist_name: string,
    artist_age: number,
    artist_image: string,
    artist_description: string,
    artist_album: string,
    artist_list_song: string
}

export const formArtist = Yup.object({
    artist_name: Yup.string().required("Trường dữ liệu bắt buộc"),
    artist_age: Yup.number().required("Trường dữ liệu bắt buộc"),
    artist_image: Yup.string().required("Trường dữ liệu bắt buộc"),
    artist_description: Yup.string().required("Trường dữ liệu bắt buộc"),
    artist_album: Yup.string().required("Trường dữ liệu bắt buộc"),
    artist_list_song: Yup.string().required("Trường dữ liệu bắt buộc")
})

export type formArtist = Yup.InferType<typeof formArtist>