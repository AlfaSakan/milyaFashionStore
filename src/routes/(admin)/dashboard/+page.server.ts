import { errorMessages } from "$lib/constants/error.contant";
import type { CreateProductDto } from "$lib/schema/product.schema";
import { env } from "$lib/server/constants/env.constant";
import { prisma } from "$lib/server/prisma";
import { generateUnixSecond } from "$lib/utils/date.util";
import { error, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  const [products, sizes, genders, categories] = await Promise.allSettled([
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

  if (
    products.status === "rejected" ||
    sizes.status === "rejected" ||
    genders.status === "rejected" ||
    categories.status === "rejected"
  )
    throw error(500, errorMessages["server-error"]);

  return {
    products: products.value,
    sizes: sizes.value,
    genders: genders.value,
    categories: categories.value,
    firebaseOptions: env,
  };
};

export const actions: Actions = {
  createProduct: async ({ request }) => {
    const formData = Object.fromEntries(
      await request.formData()
    ) as CreateProductDto & { files: string };

    const files = JSON.parse(formData.files) as string[];

    try {
      const product = await prisma.product.create({
        data: {
          description: formData.description,
          createdAt: generateUnixSecond(),
          updatedAt: generateUnixSecond(),
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
      console.error({ err });

      throw error(500, { message: "Could not create the product" });
    }
  },
};
