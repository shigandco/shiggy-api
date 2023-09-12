import { testUrl } from "./commons";
import { test, expect } from "bun:test";

test("Random - V1", async () => {
  const first = await testUrl("/api/v1/random");
  const second = await testUrl("/api/v1/random");
  expect(await first.arrayBuffer()).not.toEqual(await second.arrayBuffer());
});

test("Random - V2", async () => {
  const first = await testUrl("/api/v2/random");
  const second = await testUrl("/api/v2/random");
  expect(first.status).toEqual(302);
  expect(second.status).toEqual(302);
  expect(first.headers.get("location")).not.toEqual(
    second.headers.get("location"),
  );
});
