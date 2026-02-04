import { createContext } from "react";

import type { AuthInterface, AuthInterfaceContext } from "../interfaces";

const initialState: AuthInterface = {
  token: "",
};
export const AuthContext = createContext<AuthInterfaceContext>({
  auth: initialState,
  setAuth: () => {},
  getToken: async (): Promise<string | null> => {
    return "";
  },
  setToken: async (): Promise<void> => {},
  login: async () => ({ access_token: "", ok: false }),
  register: async () => ({
    name: "",
    _id: "",
    __v: "",
    email: "",
    password: "",
  }),
  resetAuth: () => {},
  loading: false,
  verifyToken: async () => false,
  logout: () => {},
});
