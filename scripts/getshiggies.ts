import setupShiggies from "../src/shiggyGetter";

console.info("Running postinstall...");

const limit =
  (!!Bun.env.MAX_SHIGGIES && parseInt(Bun.env.MAX_SHIGGIES as string)) || 50;
console.info(`Fetching up to ${limit} shiggies...`);

await setupShiggies(limit);
