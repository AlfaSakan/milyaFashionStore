import { prisma } from "$lib/server/prisma";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  const products = await prisma.product.findMany();

  return {
    products,
  };
};
