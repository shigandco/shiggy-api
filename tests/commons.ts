import { fetchHandler } from "../src";
export async function testUrl(url: string) {
  const request = new Request({ url: `http://localhost:8080${url}` });

  return fetchHandler(request);
}
