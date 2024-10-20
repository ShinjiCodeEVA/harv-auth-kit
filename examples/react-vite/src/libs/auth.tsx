import { AuthResponse, User } from "./api";
import { storage } from "./utils";
import { loginWithEmailAndPassword, getUser, logoutUser } from "./api";
import { configureAuth } from "harv-auth-kit"

export type LoginSchema = Omit<User, "id"> & { password: string };

export const handleUserResponse = async (data: AuthResponse) => {
  const { user, jwt } = data;
  storage.setToken(jwt);
  return user;
};

const login = async (body: LoginSchema): Promise<AuthResponse> => {
    const response = await loginWithEmailAndPassword(body);
    await handleUserResponse(response);
    return response;
}

const getUserProfile = async (): Promise<AuthResponse> => {
    const res = await getUser();
    return res;
}

const logout = async (): Promise<unknown> => {
    const response = await logoutUser();
    storage.clearToken();
    return response;
}

const { useUser, useLogin, useLogout } = configureAuth({
    loginFn: login,
    userFn: getUserProfile,
    registerFn: function (_variables: unknown): Promise<AuthResponse> {
        throw new Error("Function not implemented.");
    },
    logoutFn: logout
})

export {
    useUser,
    useLogin,
    useLogout
}