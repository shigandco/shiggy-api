import { APIRoute } from "astro";

import { GET as shiggyGetter } from "./shiggies/[id]/index";

import getShiggies, { getSizes } from "../../../utils/getShiggies";

// Allow caching of computed aspect ratios, so we don't have to recalculate on every request
const cachedAspectRatios = new Map<number, string[]>();

async function computeAspectRatios() {
  const sizes = await getSizes();
  for (const [id, dimensions] of Object.entries(sizes)) {
    const ratio = dimensions.width / dimensions.height;

    // Make sure that the ratio is available in the cache
    if (!cachedAspectRatios.has(ratio)) {
      cachedAspectRatios.set(ratio, []);
    }

    // Add the shiggy ID to the list of shiggies for that aspect ratio
    cachedAspectRatios.get(ratio)!.push(id);
  }
}

function getShigsByAspectRatio(ratio: number, variance: number): string[] {
  // Get allowed aspect ratios based on the supplied variance allowance
  const allowedAspectRatios = Array.from(cachedAspectRatios.entries()).filter(
    ([r]) => Math.abs(r - ratio) <= variance,
  );
  // Join all valid shigs into one array (typescript makes this look weird).
  return (<string[]>[]).concat(
    ...allowedAspectRatios.map(([, shigs]) => shigs),
  );
}

export const GET: APIRoute = async (APIContext) => {
  const allShiggies = await getShiggies();

  // The ID of the final shiggy to be returned
  let shig: string;
  const aspectRatio = APIContext.url.searchParams.get("aspect-ratio");
  if (aspectRatio === null) {
    // If no aspect ratio is specified, return any random shiggy
    shig = allShiggies[Math.floor(Math.random() * allShiggies.length)];
  } else {
    const parsedAspectRatio = Number(aspectRatio);
    const aspectRatioVariance = Number(
      APIContext.url.searchParams.get("aspect-ratio-variance") ?? "0",
    );

    // Make sure that parameters are valid numbers
    if (isNaN(parsedAspectRatio) || isNaN(aspectRatioVariance)) {
      return new Response(
        "aspect-ratio and aspect-ratio-variance must be numbers",
        { status: 400 },
      );
    }

    // Check if cachedAspectRatios is populated and populate it if not
    if (cachedAspectRatios.size === 0) {
      await computeAspectRatios();
    }

    let shigsOfRatio = getShigsByAspectRatio(
      parsedAspectRatio,
      aspectRatioVariance,
    );
    if (!Array.isArray(shigsOfRatio)) {
      // If no aspect ratio + variance match is found, find the closest aspect ratio we have
      const possibleRatios = Array.from(cachedAspectRatios.keys());
      const [closestRatio] = possibleRatios.sort(
        (a, b) =>
          Math.abs(parsedAspectRatio - a) - Math.abs(parsedAspectRatio - b),
      );
      shigsOfRatio = getShigsByAspectRatio(closestRatio, 0);
    }

    shig = shigsOfRatio[Math.floor(Math.random() * shigsOfRatio.length)];
  }

  APIContext.params = { id: shig };

  return shiggyGetter(APIContext);
};
