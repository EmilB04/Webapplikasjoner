import { defineApp } from "rwsdk/worker";
import { render, route } from "rwsdk/router";
import { Document } from "@/app/Document";

import { setCommonHeaders } from "./app/headers";
import App from "./components/App";

export interface Env {}

export type AppContext = {};

export default defineApp([
  setCommonHeaders(),
  render(Document, [route("/", () => <App />)]),
]);
