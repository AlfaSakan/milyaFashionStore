import type { PageLoad } from "./$types";

export const load = (() => {
  return {
    hello: "await resHello.json()",
  };
}) satisfies PageLoad;
