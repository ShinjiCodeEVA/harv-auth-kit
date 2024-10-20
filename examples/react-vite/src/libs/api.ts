import { storage } from "./utils";

export interface AuthResponse {
  user: User;
  jwt: string;
}

export interface User {
  id: string;
  email: string;
}

export async function handleApiResponse(response: Response) {
  const data = await response.json();
  console.log(data)

  if (response.ok) {
    return data;
  } else {
    console.error(JSON.stringify(data, null, 2));
    return Promise.reject(data);
  }
}

export function getUser() {
  return fetch("/auth/me", {
    headers: {
      Authorization: storage.getToken(),
    },
  }).then(handleApiResponse);
}

export function loginWithEmailAndPassword(
  data: unknown,
): Promise<AuthResponse> {
  return fetch("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  }).then(handleApiResponse);
}

export function logoutUser(
): Promise<unknown> {
  return fetch("/auth/logout", {
    method: "POST",
    headers: {
      Authorization: storage.getToken(),
    },
  }).then(handleApiResponse);
}
