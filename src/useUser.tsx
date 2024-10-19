import { QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { ReactQueryAuthConfig } from ".";

/**
 * Creates a custom hook for retrieving user data with React Query.
 *
 * @param config - Configuration object containing the user function and user key.
 * @returns A hook that manages user data retrieval.
 */
export function queryUser<User, Error, LoginCredentials, RegisterCredentials>(
  config: ReactQueryAuthConfig<User, LoginCredentials, RegisterCredentials>,
) {
  const { userFn, userKey = ["authenticated-user"] } = config;

  /**
   * Custom hook for fetching user data.
   *
   * @param options - Options for the query, omitting the query function and query key.
   * @returns The query result, which includes the user data and query state.
   */
  const useUser = (
    options?: Omit<
      UseQueryOptions<User, Error, User, QueryKey>,
      "queryKey" | "queryFn"
    >,
  ) =>
    useQuery({
      queryKey: userKey, // The key for caching the user data
      queryFn: userFn, // The function to fetch user data
      ...options, // Additional query options provided by the user
    });

  return useUser;
}
