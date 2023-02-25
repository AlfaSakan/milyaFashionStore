import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

/** @type {import('./$types').PageLoad} */
export const load: PageServerLoad = async ({ params }) => {
  const productId = params.id;

  const product = await prisma.product.findUnique({
    where: { id: productId },
    include: { Image: true },
  });

  if (!product) throw error(404, { message: "product not found" });

  const stocks = await prisma.stock.findMany({
    where: { productId: productId },
    include: { size: true },
  });

  return {
    product,
    stocks,
  };
};
