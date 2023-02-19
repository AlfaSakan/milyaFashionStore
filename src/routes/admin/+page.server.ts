import {
  createProductDto,
  type CreateProductDto,
} from "$lib/schema/product.schema";
import { prisma } from "$lib/server/prisma";
import { fail, type Actions } from "@sveltejs/kit";
import { ZodError } from "zod";
import type { PageServerLoad } from "./$types";

const now = new Date().getTime();

export const load: PageServerLoad = async () => {
  const products = await prisma.product.findMany();

  return {
    products,
  };
};

export const actions: Actions = {
  createProduct: async ({ request }) => {
    const formData = Object.fromEntries(
      await request.formData()
    ) as CreateProductDto;

    try {
      const dto = createProductDto.parse(formData);

      await prisma.product.create({
        data: { ...dto, createdAt: now, updatedAt: now },
      });
    } catch (err) {
      console.log({ err });

      if (err instanceof ZodError<CreateProductDto>) {
        const { fieldErrors: errors } = err.flatten();

        return {
          ...formData,
          errors,
        };
      }

      fail(500, { message: "Could not create the product" });
    }
  },
};
