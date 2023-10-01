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

export const GET: APIRoute = async (APIContext) => {
  const allShiggies = await getShiggies();

  // The ID of the final shiggy to be returned
  let shig: string;
  const aspectRatio = APIContext.url.searchParams.get("aspect-ratio");
  if (aspectRatio === null) {
    // If no aspect ratio is specified, return any random shiggy
    shig = allShiggies[Math.floor(Math.random() * allShiggies.length)];
  } else {
    // Check if aspectRatio is a valid number
    const parsedAspectRatio = Number(aspectRatio);
    if (isNaN(parsedAspectRatio)) {
      return new Response("aspect-ratio must be a number", { status: 400 });
    }

    // Check if cachedAspectRatios is populated and populate it if not
    if (cachedAspectRatios.size === 0) {
      await computeAspectRatios();
    }

    let shigsOfRatio = cachedAspectRatios.get(parsedAspectRatio);
    if (!Array.isArray(shigsOfRatio)) {
      // If no exact aspect ratio match is found, find the closest aspect ratio we have
      const possibleRatios = Array.from(cachedAspectRatios.keys());
      const [closestRatio] = possibleRatios.sort(
        (a, b) =>
          Math.abs(parsedAspectRatio - a) - Math.abs(parsedAspectRatio - b),
      );
      shigsOfRatio = cachedAspectRatios.get(closestRatio);
    }

    shig = shigsOfRatio![Math.floor(Math.random() * shigsOfRatio!.length)];
  }

  APIContext.params = { id: shig };

  return shiggyGetter(APIContext);
};
