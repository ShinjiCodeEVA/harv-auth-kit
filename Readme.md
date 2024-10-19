## harv-auth-kit

[![npm version](https://img.shields.io/npm/v/harv-auth-kit.svg)](https://www.npmjs.com/package/harv-auth-kit)

<p>Authenticate your application easily</p>

## Introduction

<p>Using React Query has significantly reduced our codebase size by caching server state. However, we still need to determine how to store user data, which is a global application state accessed from multiple parts of the app and is also server state retrieved from a server. This library simplifies user authentication management by providing predefined hooks that can retrieve and cache server state.</p>

## Installation

```
$ npm install @tanstack/react-query harv-auth-kit
```

## Usage

To use this library, you will need to provide it with functions for fetching the current user, logging in, registering, and logging out. You can do this using the `configureAuth` function:

```
const { useUser, useLogin, useRegister, useLogout } = configureAuth({
  userFn: () => api.get('/me'),
  loginFn: (credentials) => api.post('/login', credentials),
  registerFn: (credentials) => api.post('/register', credentials),
  logoutFn: () => api.post('/logout'),
});
```

**NOTE: All hooks and components must be used within** `QueryClientProvider`

With these hooks you can then add authentication functionality in your app
<br />

Example:
<ul>
<li> You can use the `useUser` to get the user details </li>
<li> You can use the `useLogout` to logout the user</li>
</ul>

```
function UserInfo() {
  const user = useUser();
  const logout = useLogout();

  if (user.isLoading) {
    return <div>Loading ...</div>;
  }

  if (user.error) {
    return <div>{JSON.stringify(user.error, null, 2)}</div>;
  }

  if (!user.data) {
    return <div>Not logged in</div>;
  }

  return (
    <div>
      <div>Logged in as {user.data.email}</div>
      <button disabled={logout.isLoading} onClick={logout.mutate({})}>
        Log out
      </button>
    </div>
  );
}
```

In this way no need for storing and managing auth data and actions in a `complex` global state management

## API Reference:

`configureAuth`

The configureAuth function takes a configuration object and returns a set of custom hooks for managing authentication.

Configuration Object Properties:

    userFn: A function to retrieve the authenticated user. It should return a Promise resolving to the user object or null if unauthenticated.
    loginFn: A function for logging in, accepting credentials and returning a Promise resolving to the user object.
    registerFn: A function for registering a new user, accepting credentials and returning a Promise resolving to the new user object.
    logoutFn: A function for logging out, returning a Promise that resolves when the logout action is completed.
    userKey: An optional key for storing the authenticated user in the React Query cache, defaulting to ['authenticated-user'].

Returned Object Properties:

    useUser: A hook to retrieve the authenticated user, wrapping around useQuery using the userFn and userKey from the configuration.
    useLogin: A hook to log in the user, wrapping around useMutation using the loginFn. On success, it updates the authenticated user in the React Query cache.
    useRegister: A hook to register a new user, wrapping around useMutation using the registerFn. On success, it updates the authenticated user in the cache.
    useLogout: A hook to log out the user, wrapping around useMutation using the logoutFn. On success, it removes the authenticated user from the cache.

In this way, there's no need to manage authentication data and actions using a complex global state management system.
