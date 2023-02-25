import { json } from "@sveltejs/kit";

export async function POST() {
  await prisma.stock.findMany();

  return json({ ok: true });
}
