import React from "react";
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { ReactQueryAuthConfig } from "./";

/**
 * Creates a custom hook for logging in a user with React Query.
 *
 * @param config - Configuration object containing the login function and user key.
 * @returns A hook that manages user login.
 */
export function queryLogin<User, Error, LoginCredentials, RegisterCredentials>(
  config: ReactQueryAuthConfig<User, LoginCredentials, RegisterCredentials>,
) {
  const { loginFn, userKey = ["authenticated-user"] } = config;

  /**
   * Custom hook for logging in a user.
   *
   * @param options - Options for the mutation, omitting the mutation function.
   * @returns The mutation result, which includes the login mutation's state and methods.
   */
  const useLogin = (
    options?: Omit<
      UseMutationOptions<User, Error, LoginCredentials>,
      "mutationFn"
    >,
  ) => {
    const queryClient = useQueryClient();

    const setUser = React.useCallback(
      (data: User) => queryClient.setQueryData(userKey, data),
      [queryClient],
    );

    // options?.onSuccess -> is user-defined when invoking useLogin,
    // onSuccess -> while the other is built-in to the mutation logic itself (onSuccess in useMutation).
    return useMutation({
      mutationFn: loginFn,
      ...options,
      onSuccess: (user, ...rest) => {
        setUser(user);
        options?.onSuccess?.(user, ...rest);
      },
    });
  };

  return useLogin;
}
