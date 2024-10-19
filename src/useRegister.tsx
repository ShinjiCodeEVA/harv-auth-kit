import React from "react";
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { ReactQueryAuthConfig } from "./main";

/**
 * Creates a custom hook for registering a user with React Query.
 *
 * @param config - Configuration object containing the register function and user key.
 * @returns A hook that manages user registration.
 */
export function queryRegister<
  User,
  Error,
  LoginCredentials,
  RegisterCredentials,
>(config: ReactQueryAuthConfig<User, LoginCredentials, RegisterCredentials>) {
  const { registerFn, userKey = ["authenticated-user"] } = config;

  /**
   * Custom hook for registering a user.
   *
   * @param options - Options for the mutation, omitting the mutation function.
   * @returns The mutation result, which includes the registration mutation's state and methods.
   */
  const useRegister = (
    options: Omit<
      UseMutationOptions<User, Error, RegisterCredentials>,
      "mutationFn"
    >,
  ) => {
    const queryClient = useQueryClient();

    const setUser = React.useCallback(
      (data: User) => queryClient.setQueryData(userKey, data),
      [queryClient],
    );

    // options?.onSuccess -> is user-defined when invoking useRegister,
    // onSuccess -> while the other is built-in to the mutation logic itself (onSuccess in useMutation).
    return useMutation({
      mutationFn: registerFn,
      ...options,
      onSuccess: (user, ...rest) => {
        setUser(user); // Set user data upon successful registration
        options?.onSuccess?.(user, ...rest); // Call user-defined onSuccess handler
      },
    });
  };

  return useRegister;
}
