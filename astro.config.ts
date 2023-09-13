import { AstroUserConfig, defineConfig } from "astro/config";
import nodejs from "@astrojs/node";

// https://astro.build/config
const config: AstroUserConfig = {
  output: "server",
  adapter: nodejs({
    mode: "standalone",
  }),
};
export default defineConfig(config);
