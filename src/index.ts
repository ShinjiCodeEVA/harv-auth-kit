import {
  QueryFunction,
  QueryKey,
  MutationFunction,
} from "@tanstack/react-query";
import { queryUser, queryLogin, queryLogout, queryRegister } from "./init";

/**
 * Configuration for React Query authentication hooks.
 */
export interface ReactQueryAuthConfig<
  User,
  LoginCredentials,
  RegisterCredentials,
> {
  /**
   * Function to fetch the authenticated user.
   */
  userFn: QueryFunction<User, QueryKey>;

  /**
   * Function to log in a user.
   */
  loginFn: MutationFunction<User, LoginCredentials>;

  /**
   * Function to register a new user.
   */
  registerFn: MutationFunction<User, RegisterCredentials>;

  /**
   * Function to log out the current user.
   */
  logoutFn: MutationFunction<unknown, unknown>;

  /**
   * Optional key used for caching the user data.
   */
  userKey?: QueryKey;
}

/**
 * Configures authentication hooks for React Query.
 *
 * @param config - The configuration object for setting up authentication hooks.
 * @returns An object containing the user, login, register, and logout hooks.
 */
export function configureAuth<User, LoginCredentials, RegisterCredentials>(
  config: ReactQueryAuthConfig<User, LoginCredentials, RegisterCredentials>,
) {
  const useUser = queryUser(config);
  const useLogin = queryLogin(config);
  const useRegister = queryRegister(config);
  const useLogout = queryLogout(config);

  return {
    useUser,
    useLogin,
    useRegister,
    useLogout,
  };
}
