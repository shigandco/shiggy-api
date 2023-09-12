import { BunFile } from "bun";

export type PathHandler = (
  path: string,
  req: Request,
) => Response | Promise<Response> | BunFile | Promise<BunFile> | void;
