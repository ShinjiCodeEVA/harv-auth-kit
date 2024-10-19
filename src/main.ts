import React, { useMemo } from "react";
import {
  QueryFunction,
  QueryKey,
  MutationFunction,
  UseQueryOptions,
  useQuery,
  UseMutationOptions,
  useQueryClient,
  useMutation,
} from "@tanstack/react-query";

export interface ReactQueryAuthConfig<
  User,
  LoginCredentials,
  RegisterCredentials,
> {
  userFn: QueryFunction<User, QueryKey>;
  loginFn: MutationFunction<User, LoginCredentials>;
  registerFn: MutationFunction<User, RegisterCredentials>;
  userKey?: QueryKey;
}

export function configureAuth<
  User,
  Error,
  LoginCredentials,
  RegisterCredentials,
>(config: ReactQueryAuthConfig<User, LoginCredentials, RegisterCredentials>) {
  const {
    userFn,
    loginFn,
    registerFn,
    userKey = ["authenticated-user"],
  } = config;

  // NOTE
  // useUser must accept UseQueryOptions omitting the  "queryKey" | "queryFn" since its manage in the hook
  const useUser = (
    options: Omit<
      UseQueryOptions<User, Error, User, QueryKey>,
      "queryKey" | "queryFn"
    >,
  ) =>
    useQuery({
      queryKey: userKey,
      queryFn: userFn,
      ...options,
    });

  // NOTE useLogin accepts UseMutationOptions omitting the "mutationFn"
  // it sets the data of the user through queryClient with the querykey that is used to cached when user uses the useUser
  const useLogin = (
    options: Omit<
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
        }
    })
  };
}
