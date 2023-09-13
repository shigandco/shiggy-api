import setupShiggies from "../src/shiggyGetter";

await setupShiggies(
  (!!Bun.env.MAX_SHIGGIES && parseInt(Bun.env.MAX_SHIGGIES as string)) || 50,
);
