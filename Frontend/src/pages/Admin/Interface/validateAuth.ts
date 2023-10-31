import * as Yup from "yup"
export const SignupSchema = Yup.object({
    fullName: Yup.string().required("Tên là bắt buộc"),
    email: Yup.string().email("Hãy nhập đúng định dạng email").required("Email là bắt buộc"),
    password: Yup.string().min(6, "Hãy nhập trên 6 ký tự").required("Password là bắt buộc"),
    confirmPassword: Yup.string().required("Password là bắt buộc").oneOf([Yup.ref("password")], "Passwords phải trùng nhau"),
})
export type SignupForm = Yup.InferType<typeof SignupSchema>

export const SigninSchema = Yup.object({
    email: Yup.string().email("Hãy nhập đúng định dạng email").required("Email là bắt buộc"),
    password: Yup.string().min(6, "Hãy nhập trên 6 ký tự").required("Password là bắt buộc"),
})
export type SigninForm = Yup.InferType<typeof SigninSchema>