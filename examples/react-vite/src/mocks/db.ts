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

const dbStorage = {
  setUsers: (users: AuthUser[]) => localStorage.setItem("db_users", JSON.stringify(users)),
  getUsers: () => JSON.parse(localStorage.getItem("db_users")!)
}

if (!dbStorage.getUsers()) {
  dbStorage.setUsers(users);
}

export const loginUser = (userData: DBUser): AuthUser | undefined => {
  const parsedUsers: AuthUser[] = dbStorage.getUsers();

  return parsedUsers.find((storedUser) => {
    return (
      storedUser.user.email === userData.email &&
      storedUser.user.password === userData.password
    );
  });
};

export const getUser = (jwt: string) => {
  const parsedUsers: AuthUser[] = dbStorage.getUsers();

  return parsedUsers.find((storedUser) => {
    return storedUser.jwt === jwt;
  });
};


export const logoutUser = (jwt: string) => {
  const parsedUsers: AuthUser[] = dbStorage.getUsers();

  const newUsers = parsedUsers.filter((storedUser) => {
    return storedUser.jwt !== jwt;
  });

  dbStorage.setUsers(newUsers);
}