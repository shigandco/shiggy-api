import { GET as v1get } from "../src/pages/api/v1/random";
import { GET as v2get } from "../src/pages/api/v2/random";
import { get } from "./commons";
import { test, expect } from "bun:test";

test("Random - V1", async () => {
  const first = await get(v1get);
  const second = await get(v1get);
  expect(await first.arrayBuffer()).not.toEqual(await second.arrayBuffer());
});

test("Random - V2", async () => {
  const first = await get(v2get);
  const second = await get(v2get);
  expect(first.status).toEqual(302);
  expect(second.status).toEqual(302);
  expect(first.headers.get("location")).not.toEqual(
    second.headers.get("location"),
  );
});
