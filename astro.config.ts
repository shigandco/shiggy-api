import { AstroUserConfig, defineConfig } from "astro/config";
import nodejs from "@astrojs/node";
import solid from "@astrojs/solid-js";
import tailwind from "@astrojs/tailwind";

const config: AstroUserConfig = {
  output: "server",
  integrations: [solid(), tailwind()],
  adapter: nodejs({
    mode: "standalone",
  }),
  server: {
    host: "0.0.0.0",
  },
};

// https://astro.build/config
export default defineConfig(config);
