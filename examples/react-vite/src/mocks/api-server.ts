import { http, HttpResponse } from "msw";
import { DBUser, loginUser, getUser, logoutUser } from "./db";

export const handlers = [
  http.get("/auth/me", ({ request }) => {
    const token = request.headers.get("Authorization");
    const user = getUser(token!);

    if (user) {
      return HttpResponse.json(user, { status: 200 });
    } else {
      return HttpResponse.json({ message: "Not Authorize" }, { status: 401 });
    }
  }),
  http.post("/auth/login", async ({ request }) => {
    const body = await request.json();

    const userData = loginUser(body as DBUser);

    if (userData) {
      return HttpResponse.json(userData, { status: 200 });
    } else {
      return HttpResponse.json(
        { message: "Invalid Credentials" },
        { status: 500 },
      );
    }
  }),
  http.post("/auth/logout", ({ request }) => {
    const token = request.headers.get("Authorization");
    const user = getUser(token!);

    console.log('tok: ' + token) 

    if (user) {
      logoutUser(token!);
      return HttpResponse.json({ message: "Logout successfully" }, { status: 200 });
    } else {
      return HttpResponse.json({ message: "User Not Found" }, { status: 402 });
    }
  })
];
