declare module "../../dist/server/entry.mjs" {
  import express from "express";
  export const handler: express.RequestHandler;
}
