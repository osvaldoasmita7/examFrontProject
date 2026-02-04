import { useEffect, useState, type ReactNode } from "react";
import axios from "axios";

import type {
  AuthInterface,
  IResponseLogin,
  IResponseRegister,
  IUser,
} from "../interfaces";
import {
  GET_REQUEST,
  headers,
  POST_REQUEST,
  SERVER_API,
  SERVER_ERROR,
  TOKEN,
} from "../constants";
import { AuthContext } from "../contexts";
import type { FieldType } from "../types";
import { useLocation } from "../hooks";

export interface Props {
  children: ReactNode;
}
const initialState: AuthInterface = {
  token: "",
};

export const AuthProvider = ({ children }: Props) => {
  const [auth, setAuth] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const { position, error } = useLocation();

  const getToken = async (): Promise<string | null> => {
    setLoading(true);
    try {
      const tokenStoraged = sessionStorage.getItem(TOKEN) || "";
      if (!tokenStoraged) {
        setLoading(false);
        return null;
      }
      const resp = await verifyToken(tokenStoraged);
      if (resp) setToken(tokenStoraged);
      setLoading(false);
      return tokenStoraged;
    } catch {
      setAuth(initialState);
      setLoading(false);
      return null;
    }
  };

  const setToken = async (token: string) => {
    sessionStorage.setItem(TOKEN, token);
    setAuth({ ...auth, token: token });
  };

  const logout = () => {
    sessionStorage.removeItem(TOKEN);
    resetAuth();
  };
  const resetAuth = async () => {
    setAuth(initialState);
  };

  const login = async ({ email, password }: IUser) => {
    setLoading(true);
    const data = JSON.stringify({
      email,
      password,
      ...position,
    });

    const config = {
      ...POST_REQUEST,
      headers,
      url: SERVER_API + "/user/login",
      data: data,
    };
    try {
      const resp = await axios.request(config);
      setLoading(false);
      const data = resp.data as IResponseLogin;
      sessionStorage.setItem(TOKEN, data.access_token);
      return data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response)
        throw error.response.data;
      setLoading(false);
      throw SERVER_ERROR;
    }
  };

  const verifyToken = async (token: string) => {
    setLoading(true);
    const config = {
      ...GET_REQUEST,
      headers: { ...headers, Authorization: `Bearer ${token}` },
      url: SERVER_API + "/user/verify",
    };
    try {
      const resp = await axios.request(config);
      setLoading(false);
      return resp.data as boolean;
    } catch {
      setLoading(false);
      return false;
    }
  };

  const register = async ({ email, name, password }: FieldType) => {
    const data = JSON.stringify({
      email,
      name,
      password,
    });

    const config = {
      ...POST_REQUEST,
      url: SERVER_API + "/user/register",
      headers,
      data: data,
    };
    try {
      const resp = await axios.request(config);
      return resp.data as IResponseRegister;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response)
        throw error.response.data;

      throw SERVER_ERROR;
    }
  };

  useEffect(() => {
    resetAuth();
  }, []);

  useEffect(() => {
    if (error) alert(error);
  }, [error]);
  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        getToken,
        resetAuth,
        setToken,
        loading,
        login,
        register,
        verifyToken,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
