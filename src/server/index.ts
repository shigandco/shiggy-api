import { handler } from "../../dist/server/entry.mjs";
import express from "express";
import cors from "cors";

const app = express();
app.use(
  cors({
    exposedHeaders: ["Shiggy-Id", "Location"],
  }),
);

app.use(express.static("dist/client"));

function getShiggies() {
  const url = new URL("../../scripts/getshiggies", import.meta.url);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const worker = new Worker(url);
}

app.use((req, res, next) => {
  const locals = {
    getShiggies,
  };

  handler(req, res, next, locals);
});

app.listen(4321, () => {
  console.log("Listening on http://localhost:4321");
});

getShiggies();
