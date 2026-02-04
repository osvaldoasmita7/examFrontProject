export const headers = {
    "Content-Type": "application/json",
}
export const REQUEST = {
    maxBodyLength: Infinity,

}
export const POST_REQUEST = {
    method: "post",
    ...REQUEST
}
export const GET_REQUEST = {
    method: "get",
    ...REQUEST
}

export const SERVER_ERROR = {
    success: false,
    message: "No se pudo conectar con el servidor",
}

export const TOKEN = "token"