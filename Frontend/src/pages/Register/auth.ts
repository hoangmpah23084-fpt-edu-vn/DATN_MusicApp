import instance from ".";
import { SignupForm, SigninForm } from "../Admin/Interface/validateAuth";

export const signup = (data: SignupForm) => {
    const uri = "/signup";
    return instance.post(uri, data);
}

export const signin = (data: SigninForm) => {
    const uri = "/signin";
    return instance.post(uri, data);
}

export const getAll = () => {
    const uri = "/users";
    return instance.get(uri);
}
export const remove = (id: number | string) => {
    const uri = `/users/${id}`; // Sử dụng template literal
    return instance.delete(uri);
}
