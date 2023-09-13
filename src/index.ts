import { join } from "path";
import server from "bunrest";

import { PUBLIC_DIR } from "./constants";

import v1 from "./api/v1";
import v2 from "./api/v2";
import v3 from "./api/v3";

const app = server();
app.use((req, res, next, err) => {
  if (err) {
    console.error(err); // atm theres some shit error that throws when no match, idk why
    return res.status(500).send("Internal Server Error");
  }
});

app.get("/favicon.ico", (_, res) => {
  res.status(200).send(Bun.file(join(PUBLIC_DIR, "favicon.ico")));
});

app.use("/api/v1", v1(app.router()));
app.use("/api/v2", v2(app.router()));
app.use("/api/v3", v3(app.router()));

const port = Bun.env.PORT || 19091;
app.listen(port, () => {
  console.info(`Listening on port ${port}`);
});
