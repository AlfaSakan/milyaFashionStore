import { cookiesKey } from "$lib/constants/cookies.constant";
import { errorMessages } from "$lib/constants/error.contant";
import { prisma } from "$lib/server/prisma";
import { AuthService } from "$lib/server/service/auth.service";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ cookies }) => {
  const accessToken = cookies.get(cookiesKey.accessKey);
  const refreshToken = cookies.get(cookiesKey.refreshKey);
  const authService = new AuthService();

  if (accessToken && refreshToken) {
    authService.setToken(accessToken, refreshToken);
  }

  const [products] = await Promise.allSettled([
    prisma.product.findMany({ include: { Image: true } }),
  ]);

  if (products.status === "rejected")
    throw error(500, { message: errorMessages["server-error"] });

  return {
    products: products.value,
  };
};
