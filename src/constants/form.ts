import type { Rule } from "antd/es/form";
import { RULES } from "./user";

export const SIGN_IN_FORM = {
    fields: {
        NAME: "name" as const,
        EMAIL: "email" as const,
        PASSWORD: "password" as const,
    },
    rules: {
        NAME: [{ required: true, message: "Ingresa tu nombre" }] as Rule[],
        EMAIL: [
            { required: true, message: "Ingresa tu correo" },
            { type: "email", message: RULES.EMAIL.MSG },
        ] as Rule[],
        PASSWORD: [
            { required: true, message: "Ingresa tu contraseña" },
            {
                pattern: RULES.PASSWORD.EXP,
                message: RULES.PASSWORD.MSG,
            },
        ] as Rule[],
        PASSWORD_LOGIN: [
            { required: true, message: "Ingresa tu contraseña" },
        ] as Rule[]
    }

}


