import type { CreateProductDto } from "$lib/schema/product.schema";
import { prisma } from "$lib/server/prisma";
import { error, redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  const [products, sizes, genders, categories] = await Promise.all([
    prisma.product.findMany({
      include: {
        gender: { select: { name: true } },
        category: { select: { name: true } },
        Image: true,
      },
    }),
    prisma.size.findMany(),
    prisma.gender.findMany(),
    prisma.category.findMany(),
  ]);

  return {
    products,
    sizes,
    genders,
    categories,
  };
};

export const actions: Actions = {
  createProduct: async ({ request }) => {
    const formData = Object.fromEntries(
      await request.formData()
    ) as CreateProductDto & { files: string };

    const files = JSON.parse(formData.files) as string[];

    try {
      const now = new Date().getTime();

      const product = await prisma.product.create({
        data: {
          description: formData.description,
          createdAt: now,
          updatedAt: now,
          categoryId: Number(formData.category),
          genderId: Number(formData.gender),
          name: formData.name,
        },
      });

      await prisma.image.createMany({
        data: files.map((f) => ({
          imgUrl: f,
          title: product.name,
          productId: product.id,
        })),
      });
    } catch (err) {
      console.log({ err });

      throw error(500, { message: "Could not create the product" });
    }

    throw redirect(303, "/");
  },
};
