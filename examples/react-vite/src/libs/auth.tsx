import { AuthResponse, User } from "./api";
import { storage } from "./utils";
import { loginWithEmailAndPassword, getUser } from "./api";
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

const { useUser, useLogin } = configureAuth({
    loginFn: login,
    userFn: getUserProfile,
    registerFn: function (_variables: unknown): Promise<AuthResponse> {
        throw new Error("Function not implemented.");
    },
    logoutFn: function (_variables: unknown): Promise<unknown> {
        throw new Error("Function not implemented.");
    }
})

export {
    useUser,
    useLogin
}