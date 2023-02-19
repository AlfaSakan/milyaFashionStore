import { json } from "@sveltejs/kit";

export function GET() {
  return json("Hello World 123!");
}
