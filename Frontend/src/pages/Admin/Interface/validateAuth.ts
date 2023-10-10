import * as Yup from "yup"
export const SignupSchema = Yup.object({
    fullName: Yup.string().required("First name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6).required("Password is required"),
    confirmPassword: Yup.string().required("require").oneOf([Yup.ref("password")], "Passwords must match"),
})
export type SignupForm = Yup.InferType<typeof SignupSchema>

export const SigninSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6).required("Password is required"),
})
export type SigninForm = Yup.InferType<typeof SigninSchema>