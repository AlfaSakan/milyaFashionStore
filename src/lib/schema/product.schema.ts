import { z } from "zod";

export const productName = z.string().min(3).max(150).trim();
export const productDescription = z.string().min(3).trim();

export const createProductDto = z.object({
  name: productName,
  description: productDescription,
});

export type CreateProductDto = z.infer<typeof createProductDto>;
