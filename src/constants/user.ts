export const RULES = {
    PASSWORD: { EXP: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, MSG: "La contraseña debe tener 8 caracteres, una mayúscula, un número y un símbolo" },
    EMAIL: { MSG: "El formato de correo no es válido" }
}