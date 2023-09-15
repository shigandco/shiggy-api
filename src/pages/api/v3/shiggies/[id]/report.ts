import { APIRoute } from "astro";
import type { RESTPostAPIWebhookWithTokenJSONBody } from "discord-api-types/v10";
import getShiggies from "../../../../../utils/getShiggies";

export const GET: APIRoute = async ({ params }) => {
  const allShiggies = new Set<string>(await getShiggies());

  if (!params.id || !allShiggies.has(params.id))
    return new Response("Not found", { status: 404 });

  const body: RESTPostAPIWebhookWithTokenJSONBody = {
    embeds: [
      {
        title: "Shiggy reported",
        description: `Shiggy with ID \`${params.id}\` was reported`,
        color: 0xff0000,
        image: {
          url: `https://shiggy.fun/api/v3/shiggies/${params.id}`,
        },
      },
    ],
  };

  const res = await fetch(import.meta.env.REPORT_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) return new Response("Internal server error", { status: 500 });

  return new Response("OK", { status: 200 });
};
