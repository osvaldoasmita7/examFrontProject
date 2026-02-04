import type { Dispatch, SetStateAction } from "react";
import type { FieldType } from "../types";

export interface IUser {
    email: string;
    password: string;
}
export interface IResponseRegister extends IUser {
    name: string;
    _id: string;
    __v: string | number;
}
export interface IResponseLogin {
    ok: boolean;
    access_token: string;
}
export interface AuthInterface {
    token: string;
}
export interface AuthInterfaceContext {
    auth: AuthInterface;
    setAuth: Dispatch<SetStateAction<AuthInterface>>;
    getToken: () => Promise<string | null>;
    resetAuth: () => void;
    verifyToken: (token: string) => Promise<boolean>;
    setToken: (token: string, email: string, user_type: number) => Promise<void>;
    loading: boolean;
    login: ({ email, password }: IUser) => Promise<IResponseLogin>;
    register: ({
        email,
        name,
        password,
    }: FieldType) => Promise<IResponseRegister>;
    logout: () => void;
}

