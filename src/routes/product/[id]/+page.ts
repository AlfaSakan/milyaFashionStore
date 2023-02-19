import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

/** @type {import('./$types').PageLoad} */
export const load = (({ params }) => {
  if (params.id === "123") {
    return {
      title: "Hello world!",
      content: "Welcome to our blog. Lorem ipsum dolor sit amet...",
      price: 100000,
    };
  }

  throw error(404, "Not found");
}) satisfies PageLoad;
