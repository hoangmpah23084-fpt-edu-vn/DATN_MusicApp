
import * as yup from "yup";
export interface ifUser {
    _id: string,
    fullName: string,
    email: string,
    password: string,
    role: string,
    image: string,
}

export interface ifSignup {
    name: string,
    email: string,
    password: string,
    confirmPassword: string
}

export interface ifSignin {
    email: string,
    password: string,
}

export interface ifUserUpdate {
    image?: string,
    fullName?: string
}
export interface ifUserUpgrade {
    password: string,
    passwordUpgrade: string,
    confirmPasswordUpgrade: string
}
export interface itemUser {
    _id: string,
    email: string,
    fullName: string,
    role: string,
    createdAt: string
}


export const userSchema = yup.object().shape({
    fullName: yup.string(),
})




export const userUpdateSchema = yup.object().shape({
    password: yup.string().min(6, "Hãy nhập trên 6 ký tự").required("Mật khẩu cũ là bắt buộc"),
    passwordUpgrade: yup.string().min(6, "Hãy nhập trên 6 ký tự").required("Mật khẩu mới là bắt buộc"),
    confirmPasswordUpgrade: yup.string().required("Mật khẩu mới là bắt buộc").oneOf([yup.ref("passwordUpgrade")], "Mật khẩu mới không Khớp"),
})

export const veryEmailShema = yup.object().shape({
    email: yup.string().required("Email không được để trống"),
})

export const veryPassShema = yup.object().shape({
    email: yup.string().required("Email không được để trống"),
    code: yup.string().required("Vui lòng Check mail để lấy mã xác thực"),
})


