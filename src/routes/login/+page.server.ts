import { cookiesKey } from "$lib/constants/cookies.constant";
import { errorMessages } from "$lib/constants/error.contant";
import type { LoginDto } from "$lib/schema/user.schema";
import { prisma } from "$lib/server/prisma";
import { AuthService } from "$lib/server/service/auth.service";
import { verifyHash } from "$lib/utils/hash.util";
import { error, fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

export const load = (async () => {
  return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
  signIn: async ({ request, cookies }) => {
    const formData = Object.fromEntries(await request.formData()) as LoginDto;

    const user = await prisma.user.findUnique({
      where: { email: formData.email },
    });
    if (!user) return fail(400, { email: errorMessages["email-not-register"] });

    const verifyPassword = await verifyHash(user.hash, formData.password);
    if (!verifyPassword)
      return fail(401, { password: errorMessages["password-wrong"] });

    const authService = new AuthService();

    const token = await authService.getNewToken({
      email: user.email,
      userAgent: request.headers.get("user-agent") || "",
      userId: user.id,
    });
    if (!token) throw error(500, { message: errorMessages["server-error"] });

    cookies.set(cookiesKey.accessKey, token.accessToken);
    cookies.set(cookiesKey.refreshKey, token.refreshToken);

    throw redirect(303, "/");
  },
};
