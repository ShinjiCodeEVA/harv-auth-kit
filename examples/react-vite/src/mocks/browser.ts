import { setupWorker } from "msw/browser";
import { handlers } from "./api-server";

export const worker = setupWorker(...handlers);
