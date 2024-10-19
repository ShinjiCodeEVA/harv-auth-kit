import { http, HttpResponse } from "msw";
import { DBUser, loginUser, getUser } from "./db";

export const handlers = [
  http.get("/auth/me", ({ request }) => {
    const token = request.headers.get("Authorization");
    const user = getUser(token!);

    console.log("db user token: " + user)

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
];
