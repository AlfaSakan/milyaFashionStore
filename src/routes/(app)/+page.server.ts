import { errorMessages } from "$lib/constants/error.contant";
import { prisma } from "$lib/server/prisma";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ parent }) => {
  const [products, parentValue] = await Promise.allSettled([
    prisma.product.findMany({ include: { Image: true } }),
    parent(),
  ]);

  if (products.status === "rejected" || parentValue.status === "rejected")
    throw error(500, { message: errorMessages["server-error"] });

  return {
    products: products.value,
    user: parentValue.value.user,
  };
};
