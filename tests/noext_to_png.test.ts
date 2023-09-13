import { test, expect } from "bun:test";
import { get as v2get } from "../src/pages/api/v2/[id]";
import { SHIGGY_DIR } from "../src/constants";
import { readdirSync } from "fs";
import { get } from "./commons";

const allShiggies = readdirSync(SHIGGY_DIR);

test("Extension to png - V2", async () => {
  const randomImage =
    allShiggies[Math.floor(Math.random() * allShiggies.length)];

  const response = get(v2get, { params: { id: randomImage } });

  expect(response.status).toEqual(302);
  expect(response.headers.get("location")).toEndWith(`${randomImage}.png`);
});
