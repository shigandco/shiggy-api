import { handler } from "../dist/server/entry";
import express from "express";

const app = express();

app.use(handler);

app.use(express.static("public"));

app.listen(4321, () => {
  console.log("Listening on http://localhost:4321");
});

const url = new URL("../scripts/getshiggies", import.meta.url);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const worker = new Worker(url);
