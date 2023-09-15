import { APIRoute } from "astro";
import emitter, { Events } from "../../../events";

let gotShiggies = false;

export const GET: APIRoute = () => {
  if (!gotShiggies) {
    gotShiggies = true;

    const url = new URL("../../../../scripts/getshiggies", import.meta.url);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const worker = new Worker(url);

    worker.onmessage = (event: MessageEvent<keyof Events>) => {
      emitter.emit(event.data);
    };

    return new Response(null, { status: 200 });
  }
  return new Response(null, { status: 200 });
};
