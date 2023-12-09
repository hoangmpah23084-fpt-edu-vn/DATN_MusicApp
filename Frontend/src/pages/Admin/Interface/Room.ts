import * as yup from "yup";
import { ifSong } from "./ValidateSong";


export interface IRoom {
    id: number,
    _id: string,
    name: string,
    quanlity: number,
    password?: string,
    nameGroup?: string
}
export interface DetailRoom {
    _id: string,
    nameGroup: string,
    password: string,
    isAdminGroup: isAdminGroup,
    listMessages: listMessages[],
    room_image: string[],
    listSong: ifSong[] | []
    memberGroup: memberGroup[],
}
export interface memberGroup {
    _id: string,
    fullName: string,
    email: string,
    role: string,
}
export interface isAdminGroup {
    _id: string,
    email: string,
    fullName: string,
    role: string
}
export interface listMessages {
    _id: string,
    textMessage: string,
    id_sender: {
        _id: string,
        fullName: string,
    }
}


export const RoomSchame = yup.object().shape({
    password: yup.string().required('Mật khẩu không được để trống'),
})

export const CreateRoomSchame = yup.object().shape({
    password: yup.string(),
    nameGroup: yup.string().required('Tên phòng không được để trống'),
})

export const CreatePlaylistSchame = yup.object().shape({
    playlist_name: yup.string().required('Tên phòng không được để trống'),

})

