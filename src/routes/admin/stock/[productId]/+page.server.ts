import { prisma } from "$lib/server/prisma";
import { bigIntHandling } from "$lib/utils/number.util";
import { error, fail, redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  const { productId } = params;

  const product = await prisma.product.findUnique({
    where: { id: productId },
    include: {
      category: {
        select: { name: true },
      },
      gender: {
        select: { name: true },
      },
    },
  });
  if (!product) {
    // throw redirect(301, "/admin");
    throw error(500, { message: "Product tidak ada" });
  }

  const [sizes, stocks] = await Promise.all([
    prisma.size.findMany({ where: { categoryId: product.categoryId } }),
    prisma.stock.findMany({
      where: { productId },
      include: { size: true },
      orderBy: { sizeId: "asc" },
    }),
  ]);

  return {
    sizes,
    stocks,
    product: bigIntHandling(product),
  };
};

export const actions: Actions = {
  updateStock: async ({ request, params }) => {
    const { productId } = params;

    if (!productId) return fail(500, { message: "productId not found!" });

    const formData = Object.fromEntries(await request.formData()) as Record<
      string,
      string
    >;

    const stocks = (
      await prisma.stock.findMany({
        where: { productId },
        select: { id: true, sizeId: true },
      })
    ).map((st) => ({ id: st.id, amount: Number(formData[st.sizeId]) }));

    try {
      for (const { amount, id } of stocks) {
        await prisma.stock.update({ where: { id }, data: { amount } });
      }
    } catch (err) {
      fail(500, { message: "Could not edit the product" });
    }
  },
  newStock: async ({ params }) => {
    const { productId } = params;

    if (!productId) return fail(500, { message: "productId not found!" });

    const product = await prisma.product.findUnique({
      where: { id: productId },
    });
    if (!product) {
      throw redirect(302, "/admin");
    }

    const sizes = await prisma.size.findMany({
      where: { categoryId: product.categoryId },
    });

    const data = sizes.map((sz) => ({ productId, sizeId: sz.id }));

    try {
      await prisma.stock.createMany({ data: data });
    } catch (err) {
      console.warn(err);
      fail(500, { message: "Failed to create stock" });
    }
  },
};
