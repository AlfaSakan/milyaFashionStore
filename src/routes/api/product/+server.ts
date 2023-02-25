import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async () => {
  return new Response(JSON.stringify({ hello: "hello 123" }));
};
