import { testUrl } from "./commons";
import { test, expect } from "bun:test";

test("Extension to png - V2", async () => {
  const randomImage = (await testUrl("/api/v2/random")).headers.get(
    "location",
  )!;

  const link = randomImage?.replace(".png", "");
  const response = await testUrl(link);

  expect(response.status).toEqual(302);
  expect(response.headers.get("location")).toEndWith(randomImage);
});
