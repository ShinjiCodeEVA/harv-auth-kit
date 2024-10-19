import { v4 as uuid } from "uuid";

export type DBUser = {
  email: string;
  password: string;
};

export type AuthUser = {
  user: DBUser;
  jwt: string;
};

export const users: AuthUser[] = [
  {
    user: {
      email: "johndoe@gmail.com",
      password: "password123",
    },
    jwt: uuid(),
  },
  {
    user: {
      email: "johnsmith@gmail.com",
      password: "password123",
    },
    jwt: uuid(),
  },
];

localStorage.setItem("db_users", JSON.stringify(users))

export const loginUser = (userData: DBUser): AuthUser | undefined => {
  const usersStored = localStorage.getItem("db_users")
  const parsedUsers: AuthUser[] = usersStored ? JSON.parse(usersStored) : [];

  return parsedUsers.find((storedUser) => {
    return (
      storedUser.user.email === userData.email &&
      storedUser.user.password === userData.password
    );
  });
};

export const getUser = (jwt: string) => {
  const usersStored = localStorage.getItem("db_users")
  const parsedUsers: AuthUser[] = usersStored ? JSON.parse(usersStored) : [];

  return parsedUsers.find((storedUser) => {
    return storedUser.jwt === jwt;
  });
};
