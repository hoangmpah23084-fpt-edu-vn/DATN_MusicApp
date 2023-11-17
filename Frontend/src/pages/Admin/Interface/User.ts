export interface ifUser {
    _id: string,
    fullName: string,
    email: string,
    password: string,
    role: string,
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