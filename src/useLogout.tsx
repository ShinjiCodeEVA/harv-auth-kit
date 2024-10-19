import React from "react";
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { ReactQueryAuthConfig } from "./main";

/**
 * Creates a custom hook for logging out a user with React Query.
 *
 * @param config - Configuration object containing the logout function and user key.
 * @returns A hook that manages user logout.
 */
export function queryLogout<User, Error, LoginCredentials, RegisterCredentials>(
  config: ReactQueryAuthConfig<User, LoginCredentials, RegisterCredentials>,
) {
  const { logoutFn, userKey = ["authenticated-user"] } = config;

  /**
   * Custom hook for logging out a user.
   *
   * @param options - Options for the mutation, omitting the mutation function.
   * @returns The mutation result, which includes the logout mutation's state and methods.
   */
  const useLogout = (
    options: Omit<UseMutationOptions<unknown, Error, unknown>, "mutationFn">,
  ) => {
    const queryClient = useQueryClient();

    const setUser = React.useCallback(
      (data: User | null) => queryClient.setQueryData(userKey, data),
      [queryClient],
    );

    return useMutation({
      mutationFn: logoutFn,
      ...options,
      onSuccess: (...args) => {
        setUser(null); // Clear user data on logout
        options?.onSuccess?.(...args); // Call user-defined onSuccess handler
      },
    });
  };

  return useLogout;
}
